// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
        {/* <!-- Using DM Sans as a fallback since "National Park" is not available on Google Fonts --> */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          {`tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'navy': '#1e2640',
                  'cream': '#f3eac0',
                  'teal': '#008193',
                  'teal-light': '#e6f7f9',
                  'desert-sun': '#dc9750',
                  'rose-red': '#922c40'
                },
                fontFamily: {
                  'national-park': ['"DM Sans"', 'sans-serif'],
                },
              }
            }
          }`}
        </script>
        {assets}
        <title>Solomon's Web - Bible Exploration</title>
      </head>
      <body class="font-national-park bg-cream">
        <div id="app">{children}</div>
        {scripts}
        {/* <script src="/src/index.jsx" type="module"></script> */}
      </body>
      </html>
    )}
  />
));