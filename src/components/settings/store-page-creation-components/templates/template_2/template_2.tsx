import { Config } from "@measured/puck";

export const template2:Config = {
  components: {
    DesignTwo: {
      label: "Design Two",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
      },
      defaultProps: {
        title: "Hero Title",
        description: "This is a hero description",
      },
      render: ({ title, description }) => (
        <div style={{ background: "#eee", padding: 20 }}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      ),
    },
  },
  };
  