import React from 'react';

const PageView = ({ page }) => {
    return (
        <div className="page-view">
            <div className="left-page">
                <img src={page.image} alt="Page Illustration" />
            </div>
            <div className="right-page">
                <h1>{page.title}</h1>
                <p>{page.text}</p>
            </div>
        </div>
    );
};

export default PageView;