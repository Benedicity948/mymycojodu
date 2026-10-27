export const theme = {
  colors: {
    ink: "#24152c",
    plum: "#6f1d63",
    berry: "#8c2376",
    pink: "#d17bc0",
    white: "#ffffff",
  },
  fonts: {
    body: '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: '"DM Serif Display", Georgia, serif',
  },
  gradients: {
    page: "linear-gradient(145deg, #fffafe 0%, #fff8fc 48%, #f8f4fc 100%)",
    loader:
      "radial-gradient(ellipse at 50% 42%, rgb(255 255 255 / 92%), transparent 42%), linear-gradient(145deg, #fff7fc 0%, #f8edf7 54%, #eee8f8 100%)",
  },
} as const;
