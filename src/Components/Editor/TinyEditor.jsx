import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Cookies from "js-cookie";

export default function TinyEditor({ onChange, initialValue }) {
  const editorRef = useRef(null);

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue || ""}
      init={{
        height: "70vh",
        menubar: true,
        license_key: "gpl",
        selector: "textarea",
        image_uploadtab: false,

        plugins: [
          "lists",
          "link",
          "image",
          "code",
          "table",
          "wordcount", // 👈 sin 'paste'
        ],

        toolbar:
          "undo redo | formatselect | styleselect | " +
          "bold italic underline strikethrough | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | " +
          "table | removeformat code",

        block_formats:
          "Párrafo=p; Encabezado 1=h1; Encabezado 2=h2; Encabezado 3=h3; Encabezado 4=h4; Encabezado 5=h5; Encabezado 6=h6; Preformateado=pre; Bloque de cita=blockquote",

        style_formats: [
          { title: "Texto destacado", inline: "span", classes: "destacado" },
          { title: "Aviso", block: "div", classes: "aviso" },
          { title: "Nota", block: "div", classes: "nota" },
        ],

        content_style: `
          body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
          .destacado { background-color: #ffffcc; padding: 2px 4px; }
          .aviso { background-color: #ffeeee; padding: 10px; border-left: 4px solid #ff6666; }
          .nota { background-color: #eef6ff; padding: 10px; border-left: 4px solid #3399ff; }
        `,

        automatic_uploads: true,
        file_picker_types: "image",
        images_upload_url: `${import.meta.env.VITE_API_URL}/api/eventos/upload`,
        image_title: true,
        image_caption: true,

        menu: { tools: { title: "Tools", items: "listprops" } },

        link_context_toolbar: true,
        link_title: true,
        link_assume_external_targets: true,

        paste_data_images: true, // esto sí puedes dejarlo

        file_picker_callback: function (callback, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");

          if (meta.filetype === "image") {
            input.setAttribute("accept", "image/*");
          }

          input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function () {
              var formData = new FormData();
              formData.append("file", file);

              fetch(`${import.meta.env.VITE_API_URL}/api/eventos/upload`, {
                method: "POST",
                body: formData,
                headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  callback(data.location, {
                    title: file.name,
                  });
                })
                .catch((error) => {
                  console.error("Error al subir el archivo:", error);
                });
            };

            reader.readAsDataURL(file);
          };

          input.click();
        },

        formats: {
          removeformat: [
            {
              selector:
                "b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",
              remove: "all",
              split: true,
              expand: false,
              block_expand: true,
              deep: true,
            },
            {
              selector: "span",
              attributes: ["style", "class"],
              remove: "empty",
              split: true,
              expand: false,
              deep: true,
            },
            {
              selector: "*",
              attributes: ["style", "class"],
              split: false,
              expand: false,
              deep: true,
            },
          ],
        },
      }}
      onEditorChange={onChange}
    />
  );
}
