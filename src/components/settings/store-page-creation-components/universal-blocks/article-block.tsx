import { ComponentConfig } from "@measured/puck";

export const PuckArticleBlock: ComponentConfig = {
  label: "Article",
  fields: { children: { type: "slot" } },
  defaultProps: {
    children: [
      {
        type: "HeadingBlock",
        props: {
          title: "Header",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#111111",
          textAlign: "left",
        },
      },
      {
        type: "PuckSubHeaderBlock",
        props: {
          subHeader: "This is a subheader",
        },
      },
      {
        type: "ParagraphBlock",
        props: {
          text: "This is a sample paragraph .",
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#333333",
        },
      },
    ],
  },
  render: ({ children: Children }) => {
    return (
      <article>
        <Children />
      </article>
    );
  },
};
