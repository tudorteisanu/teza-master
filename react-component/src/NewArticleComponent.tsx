import * as React from 'react';
import {FunctionComponent, useState} from "react";

import "./profile-style.css";

export interface INewArticleComponent {
    onSubmit: () => void;
    errors: string[]
}

export const NewArticleComponent: FunctionComponent<INewArticleComponent> = (
    props: INewArticleComponent
) => {
    const [state] = useState(props as any);
    const [form, setForm] = useState({title: "", description: "", body: ""} as any);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    }


    const handleSubmit = async () => {
        state.onSubmit(form);
    }

    return (
        <div className="container">

            <div style={{
                display: "flex",
                paddingTop: "10px",
                flexDirection: 'column',
                margin: "auto",
                maxWidth: "32rem"
            }}>
                {state.errors &&
                    state.errors.map(error => <div>
                        {error}
                    </div>)
                }
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder={'Article title'}
                />
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder={'What this article about?'}
                />
                <textarea
                    rows={3}
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                    placeholder={'Write your article.'}
                ></textarea>
                <button  style={{
                    background: '#5cb85c',
                    color: '#fff'
                }} onClick={handleSubmit}>Summit</button>
            </div>
        </div>
    );
};
