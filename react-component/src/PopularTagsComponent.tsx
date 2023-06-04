import * as React from 'react';
import {FunctionComponent, useEffect, useState} from "react";

import "./popular-tags-style.css";
const API_URL = 'https://api.realworld.io/api/tags';

export const PopularTagsComponent: FunctionComponent<void> = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTags = async () => {
        try {
            setLoading(true);
            const data = await  fetch(API_URL);
            const {tags: payload} = await data.json();
            setTags(payload);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTags();
    }, []);

    if (loading) {
        return <div>Loading tags...</div>
    }

    return (
        <div className="popular-tags">
            <h2 className={'popular-tags__title'}>
                Popular tags!
            </h2>
            <ul>
                {tags.map((item) => <li
                    key={item}
                    className={'popular-tags__item'}
                >{item}</li>)}
            </ul>
        </div>
    );
};
