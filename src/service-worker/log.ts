export const log =
  process.env.NODE_ENV === "production"
    ? () => {}
    : (message: string) => {
        const styles = [
          `background: green`,
          `border-radius: 0.5em`,
          `color: white`,
          `font-weight: bold`,
          `padding: 2px 0.5em`,
        ];
        // When in a group, the workbox prefix is not displayed.
        const logPrefix = ["%cbandicoot", styles.join(";")];
        console.log(...logPrefix, message);
      };
