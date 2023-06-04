---
title: "Alpha Blending in Rust"
date: "2023-06-04"
---

Say we have two pixels: one opaque red `rgba(255, 0, 0, 255)`, and one blue with 50% opacity `rgba(0, 0, 255, 127)`, it stands to reason that if we were to overlay the translucent blue over the opaque red, we would be left with an opaque purple, like below:

<div style="text-align:center;">
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#FF0000"/>
        <circle cx="80" cy="40" r="40" fill="#0000FF" fill-opacity="0.5"/>
    </svg>
</div>

Let's write the bones of a function alongside a simple initial failing test:

```rust
type Rgba = [u8; 4];

fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    unimplemented!();
}

#[test]
fn test_blend_rgba() {
    // test that layering translucent blue above opaque red results in opaque purple.
    let opaque_red = [255, 0, 0, 255];
    let translucent_blue = [0, 0, 255, 127];
    let opaque_purple = [127, 0, 127, 255];
    assert_eq!(blend_rgba(opaque_red, translucent_blue), opaque_purple);
}
```

Let's fill out the `blend_rgba`, starting with the classic alpha blending formula as in https://en.wikipedia.org/wiki/Alpha_compositing

first calculate the final alpha $\alpha$ from the foreground and background alpha channels

$$
\alpha = \alpha_f + \alpha_b(1 - \alpha_f)
$$

That is then used to calculate each individual colour channel $C$

$$
C = \frac{C_f \alpha_f + C_b \alpha_b (1 - \alpha_f)}{\alpha}
$$

Let's implement this in code, without any attempt to optimise:

```rust
fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    // convert all our values to floats in the range [0, 1]
    let r_fg: f32 = fg[0] as f32 / 255.0;
    let g_fg: f32 = fg[1] as f32 / 255.0;
    let b_fg: f32 = fg[2] as f32 / 255.0;
    let a_fg: f32 = fg[3] as f32 / 255.0;
    let r_bg: f32 = bg[0] as f32 / 255.0;
    let g_bg: f32 = bg[1] as f32 / 255.0;
    let b_bg: f32 = bg[2] as f32 / 255.0;
    let a_bg: f32 = bg[3] as f32 / 255.0;

    // calculate final alpha
    let a = a_fg + a_bg * (1.0 - a_fg);

    // calculate final colour channels
    let r = ((r_fg * a_fg) + (r_bg * a_bg * (1.0 - a_fg))) / a;
    let g = ((g_fg * a_fg) + (g_bg * a_bg * (1.0 - a_fg))) / a;
    let b = ((b_fg * a_fg) + (b_bg * a_bg * (1.0 - a_fg))) / a;

    // reconvert our floats to be ints in the range [0, 255]
    [
        (r * 255.0) as u8,
        (g * 255.0) as u8,
        (b * 255.0) as u8,
        (a * 255.0) as u8,
    ]
}
```

Running our test, we find that the output of our test is the purple `rgba(127, 0, 127, 255)`. Perfect!

However, this probably isn't very fast. Let's write some benchmarks to see if we can optimise it. We'll use criterion to make our benchmarks.

We add the following to the `cargo.toml` config:

```toml
# rust-alpha-blending/Cargo.toml
[dev-dependencies]
criterion = "0.5.1"

[[bench]]
name = "benchmarks"
harness = false
```

and write our first benchmark:


```rust
// benches/benchmarks.rs
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use rust_alpha_blending::v1;

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("v1::blend_rgba", |b| {
        b.iter(|| v1::blend_rgba(black_box([255, 0, 0, 255]), black_box([0, 0, 255, 127])))
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);

```

On my m1 macbook, this works out as 4.4585 ns!
On my dell xps 13, this works out as xxx ns.

pretty fast, however we need it to be faster. On a 4k monitor with resolution 3840x2160, that is 8,294,400

doing this blend operation would take 36.9805824 milliseconds. To maintain a solid 60fps at 4k we would (theoretically) need to get this down to below 16 milliseconds.

Let's see where we can optimise!


