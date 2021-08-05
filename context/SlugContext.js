import { createContext, useState, useEffect } from "react";

export const SlugContext = createContext();

export const SlugProvider = ({ children }) => {
    const [state, setState] = useState({
        title: "YUM NOM NOM",
        subtitle: "",
        background: "https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/resources%2Fprincipal.png?alt=media&token=f54afab0-0e72-4590-a711-20f72204938f"
    })
    const [currentTag, setCurrentTag] = useState(null);
    const handleSlugSelected = (values) => setState((current) => ({ ...current, ...values }));
    const handleTagSelected = (tag) => setCurrentTag(tag);
    return (
        <SlugContext.Provider value={{
            heroTitle: state.title,
            heroSubtitle: state.subtitle,
            heroBackground: state.background,
            currentTag,
            handleSlugSelected,
            handleTagSelected
        }}
        >
            {children}
        </SlugContext.Provider>
    );
}