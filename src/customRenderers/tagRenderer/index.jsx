import "./style.css"
export default function TagRenderer(params) {
    const tags = params.value.map((v,i) => <span className="ag-tag" key={i}>{v}</span>)
    return <div>
        {tags}
    </div>
}