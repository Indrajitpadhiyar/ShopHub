import { useEffect } from "react";

const MetaData = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMetaTag = (name, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
  }, [title, description, keywords]);

  return null;
};

export default MetaData;
