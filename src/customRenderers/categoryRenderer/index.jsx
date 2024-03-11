import "./style.css"
export default function CategoryRenderer(params) {
    const tags = params.value.map((v, i) => {
        const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        return (<span
            className="ag-category"
            key={i}
            style={{
                background: `(${randomColor},0.3)`,
                border: `1px solid ${randomColor}`,
                color:`${randomColor}`
            }}>{v}</span>)
    })


    return <div>
        {tags}
    </div>
}