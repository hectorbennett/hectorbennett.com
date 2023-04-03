import React from "react";

type TagProp<C extends React.ElementType> = {
  tag?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (TagProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & TagProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
export type PolymorphicProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C>;

/**
 * This is the type used in the type annotation for the component
 */
export type PolymorphicComponent = <C extends React.ElementType = "span">(
  props: PolymorphicProps<C>,
) => React.ReactElement | null;

export const Polymorphic: PolymorphicComponent = React.forwardRef(function PolymorphicComponent<
  C extends React.ElementType = "span",
>({ tag, children, ...props }: PolymorphicProps<C>, ref?: PolymorphicRef<C>) {
  const Component = tag || "span";

  return (
    <Component {...props} ref={ref}>
      {children}
    </Component>
  );
});

export default Polymorphic;
