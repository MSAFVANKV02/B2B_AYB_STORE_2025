import { Config } from "@measured/puck";

export const template3:Config = {
    components: {
        DesignThree: {
            label: "Design Three",
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
