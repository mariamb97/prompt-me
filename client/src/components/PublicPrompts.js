import React, { useState, useEffect } from 'react';
import PublicPrompt from "./PublicPrompt";

export default function PublicPrompts() {
    const [publicPrompts, setPublicPrompts] = useState([])

    useEffect(() => {
        getPublicPrompts()
    }, [])

    const getPublicPrompts = async () => {
        try {
            const response = await fetch("/prompts/publics", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const publicPrompts = await response.json();
            if (!publicPrompts.message) {
                setPublicPrompts(publicPrompts);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="main">
            <h3>Take your prompt!</h3>
            <p>Popular categories:</p>
            {publicPrompts && publicPrompts.map((prompt) => (
                <PublicPrompt key={prompt.id} PublicPrompt={prompt} />
            ))}
        </div>
    )
}
