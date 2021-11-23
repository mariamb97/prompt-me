import React, { useState } from "react";
import User from "../img/user.svg";

export default function PublicPrompt({ PublicPrompt }) {
    const [publicPrompt, setPublicPrompt] = useState(PublicPrompt)
    return (
        <div>
            <article className="prompts">
                <section className="prompts__main">
                    {publicPrompt &&
                        <div>
                            <p>#{publicPrompt.name}</p>
                            <p className="prompts__description">{publicPrompt.text}</p>
                            <div className="prompts__requirements">
                                {publicPrompt.requirements}
                            </div>
                            <footer className="prompts__footer">
                                <div className="prompts-footer__author">
                                    <div>
                                        <img src={User} alt="user avatar"></img>
                                    </div>
                                    <div>
                                        <p>{publicPrompt.nickname}</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    }





                </section>
            </article>
        </div>
    )
}
