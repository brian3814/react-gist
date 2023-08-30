import React, { useEffect, useRef } from 'react';

const Gist = ({ id, file }) => {
    const iframeNodeRef = useRef(null);

    const updateIfraameContent = () => {
        const iframe = iframeNodeRef.current;

        if(!iframe) return;
        
        let doc = iframe.document;

        if (iframe.contentDocument) doc = iframe.contentDocument;
        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

        const gistLink = defineUrl();
        const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
        const styles = "<style>*{font-size:12px;}</style>";
        const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
        const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
        const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;

        doc.open();
        doc.writeln(iframeHtml);
        doc.close();
    }
    
    const defineUrl = () => {
        const fileArg = file ? `?file=${file}` : "";
    
        const url = `https://gist.github.com/${id}.js${fileArg}`;
        
        return url;
    }

    useEffect(()=>{
        updateIfraameContent();
    },[]);

    return (
        <iframe
            ref={iframeNodeRef}
            width="100%"
            frameBorder={0}
            id={file ? `gist-${id}-${file}` : `gist-${id}`}
        />
    );
}

export default Gist;