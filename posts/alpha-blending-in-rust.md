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

The first thing we can do is to simplify the equations, we can achieve a bit of an increase by removing the need to divide by 255 and then multiply by 255 again, e.g.

```rust
fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    let r_fg = fg[0] as f32;
    let g_fg = fg[1] as f32;
    let b_fg = fg[2] as f32;
    let a_fg = fg[3] as f32;
    let r_bg = bg[0] as f32;
    let g_bg = bg[1] as f32;
    let b_bg = bg[2] as f32;
    let a_bg = bg[3] as f32;

    // calculate final alpha * 255
    let a_0 = (a_fg * 255.0) + (a_bg * 255.0) - (a_fg * a_bg);

    let r = (255.0 * r_fg * a_fg + 255.0 * a_bg * r_bg - a_fg * a_bg * r_bg) / a_0;
    let g = (255.0 * g_fg * a_fg + 255.0 * a_bg * g_bg - a_fg * a_bg * g_bg) / a_0;
    let b = (255.0 * b_fg * a_fg + 255.0 * a_bg * b_bg - a_fg * a_bg * b_bg) / a_0;

    [r as u8, g as u8, b as u8, (a_0 / 255.0) as u8]
}
```

This gives us a very moderate speed increase, but nothing drastic. What it does is set us up to to remove those conversions to floats:

```rust
pub fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    let r_fg = fg[0] as u32;
    let g_fg = fg[1] as u32;
    let b_fg = fg[2] as u32;
    let a_fg = fg[3] as u32;
    let r_bg = bg[0] as u32;
    let g_bg = bg[1] as u32;
    let b_bg = bg[2] as u32;
    let a_bg = bg[3] as u32;

    // calculate final alpha * 255
    let a_0 = (a_fg * 255) + (a_bg * 255) - (a_fg * a_bg);

    let r = (255 * r_fg * a_fg + 255 * a_bg * r_bg - a_fg * a_bg * r_bg) / a_0;
    let g = (255 * g_fg * a_fg + 255 * a_bg * g_bg - a_fg * a_bg * g_bg) / a_0;
    let b = (255 * b_fg * a_fg + 255 * a_bg * b_bg - a_fg * a_bg * b_bg) / a_0;

    [r as u8, g as u8, b as u8, (a_0 / 255) as u8]
}
```

Now we're getting somewhere! Our benchmark is down from ~4.5ns to ~3ns.

There is a special trick for dividing by 255 for all positive integers less than 65,535. Let's use it:

65535

```rust
#[inline]
pub fn fast_divide_by_255(i: u32) -> u32 {
    (i + 1 + (i >> 8)) >> 8
}

pub fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    let r_fg = fg[0] as u32;
    let g_fg = fg[1] as u32;
    let b_fg = fg[2] as u32;
    let a_fg = fg[3] as u32;
    let r_bg = bg[0] as u32;
    let g_bg = bg[1] as u32;
    let b_bg = bg[2] as u32;
    let a_bg = bg[3] as u32;

    // calculate final alpha * 255
    let a_0 = (a_fg * 255) + (a_bg * 255) - (a_fg * a_bg);

    let r = (255 * r_fg * a_fg + 255 * a_bg * r_bg - a_fg * a_bg * r_bg) / a_0;
    let g = (255 * g_fg * a_fg + 255 * a_bg * g_bg - a_fg * a_bg * g_bg) / a_0;
    let b = (255 * b_fg * a_fg + 255 * a_bg * b_bg - a_fg * a_bg * b_bg) / a_0;

    [r as u8, g as u8, b as u8, fast_divide_by_255(a_0) as u8]
}
```

Now we will use SIMD, which works only on nightly rust. In lib.rs we must add the line:

#![feature(portable_simd)]

Then we must specify that we are running our code with nightly, by running `rustup default nightly`

```rust
pub fn blend_rgba(bg: Rgba, fg: Rgba) -> Rgba {
    let r_fg = fg[0] as u32;
    let g_fg = fg[1] as u32;
    let b_fg = fg[2] as u32;
    let a_fg = fg[3] as u32;
    let r_bg = bg[0] as u32;
    let g_bg = bg[1] as u32;
    let b_bg = bg[2] as u32;
    let a_bg = bg[3] as u32;

    let thing_1 = 255 * a_fg;
    let thing_2 = 255 * a_bg - a_fg * a_bg;

    // calculate final alpha * 255
    let a_0 = thing_1 + thing_2;

    // calculate red and green together with simd
    let rg = (u32x2::splat(thing_1) * u32x2::from([r_fg, g_fg])
        + u32x2::splat(thing_2) * u32x2::from([r_bg, g_bg]))
        / u32x2::splat(a_0);

    // calculate blue on its own
    let b = (thing_1 * b_fg + thing_2 * b_bg) / a_0;

    [
        rg[0] as u8,
        rg[1] as u8,
        b as u8,
        fast_divide_by_255(a_0) as u8,
    ]
}
```

This gets us to about 3.33 ns, giving us almost a 50% speed improvement.
