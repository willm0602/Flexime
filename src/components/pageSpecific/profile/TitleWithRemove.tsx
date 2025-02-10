import React from 'react';

export default function TitleWithRemove(props: {
    title: string;
    remove: CallableFunction;
    level?: 2 | 3 | 4 | 5;
}) {
    const { title, remove } = props;
    const level = props.level || 2;
    const TitleHeader: React.ElementType = `h${level}`;

    return (
        <div className="flex">
            <TitleHeader className="my-0 pt-0 mr-4">{title}</TitleHeader>
            <button className="btn btn-error btn-xs" onClick={() => remove()}>
                Remove
            </button>
        </div>
    );
}