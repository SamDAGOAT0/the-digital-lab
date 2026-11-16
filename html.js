
/* =====================================================
   THE DIGITAL LAB
   CHAPTER 001 — HTML PLAYGROUNDS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // PLAYGROUND CONFIGURATION
    // ==========================================

    const playgrounds = [
        {
            editor: "#html-editor",
            preview: "#html-preview",
            name: "Lesson 01"
        },
        {
            editor: "#elements-editor",
            preview: "#elements-preview",
            name: "Lesson 02"
        },
        {
            editor: "#headings-editor",
            preview: "#headings-preview",
            name: "Lesson 03"
        },
        {
            editor: "#formatting-editor",
            preview: "#formatting-preview",
            name: "Lesson 04"
        }
    ];


    // ==========================================
    // PREVIEW STYLES
    // ==========================================

    const previewStyles = `
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            padding: 24px;
            color: #171717;
            line-height: 1.6;
        }

        h1 {
            font-size: 32px;
            margin-top: 0;
        }

        h2 {
            font-size: 24px;
        }

        h3 {
            font-size: 19px;
        }

        p {
            font-size: 15px;
            line-height: 1.7;
        }

        strong {
            color: #d66b36;
        }

        button {
            padding: 10px 18px;
            border: none;
            border-radius: 6px;
            background: #222;
            color: white;
            cursor: pointer;
        }

        img {
            max-width: 100%;
        }

        hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 20px 0;
        }
    `;


    // ==========================================
    // INITIALISE EACH PLAYGROUND
    // ==========================================

    playgrounds.forEach((playground) => {

        const editor = document.querySelector(playground.editor);
        const preview = document.querySelector(playground.preview);

        if (!editor || !preview) {
            console.warn(
                `${playground.name}: Playground elements not found.`
            );
            return;
        }


        // UPDATE BROWSER PREVIEW

        function updatePreview() {

            const userCode = editor.value;

            preview.srcdoc = `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">

                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    >

                    <style>
                        ${previewStyles}
                    </style>

                </head>

                <body>

                    ${userCode}

                </body>

                </html>
            `;
        }


        // LISTEN FOR TYPING

        editor.addEventListener("input", updatePreview);


        // INITIAL PREVIEW

        updatePreview();


        console.log(`${playground.name} playground initialized.`);

    });


    console.log("THE DIGITAL LAB — HTML Chapter initialized.");

});
