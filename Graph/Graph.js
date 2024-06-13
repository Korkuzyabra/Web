document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("animation_btn")
        .addEventListener("click", function () {
            Picture_Draw(document.getElementById("setting"));
        });
    document.getElementById("clear_btn").addEventListener("click", function () {
        clear_ALL();
    });
});

let svg = d3.select("svg").attr("width",800).attr("height", 800);
const r = 200;
function Primitive_Draw(X_pos, Y_pos) {
    let primitive = svg.append("g").style("stroke", "#ffd80c").style("stroke-width", 1).style("fill", "#ba1fc5");
    primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -50).attr("y1", 0).attr("x2", 50).attr("y2", 0);
    primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", 0).attr("y1", -50).attr("x2", 0).attr("y2", 50);
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 42).style("fill", "#fff");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).style("fill", "#8aed12");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 35).style("fill", "rgba(127,9,253,0.69)").style("stroke", "#c110b4");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 23).style("fill", "#00AAFF");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 21.5).style("fill", "#f41371");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 21).style("fill", "#fff");
    primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 19.5).style("fill", "#f41371");
    primitive.append("line").style("stroke", "#fff").style("stroke-width", 0.5).attr("x1", 10).attr("y1", -10).attr("x2", -10).attr("y2", 10);
    primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -42).attr("y1", 0).attr("x2", 0).attr("y2", -42);
    primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", 0).attr("y1", -42).attr("x2", 42).attr("y2", 0);

    let arc = d3.arc().innerRadius(35).outerRadius(35);
    primitive.append("path").attr("d",arc({ startAngle: (Math.PI / 3) * 2, endAngle: (Math.PI / 3) * 4 })).style("stroke", "brown");
    primitive.attr("transform", "scale(1)");
    return primitive;
}

let Picture_Draw = (dataForm) => {

    let pict = Primitive_Draw(100, 300);
    let path = drawPath(300, 300);
    let speed_animation =
        dataForm.animation_time.value == ""
            ? 6000
            : parseFloat(dataForm.animation_time.value);

    let degree = dataForm.scale_checkbox.checked ? 0 : 1

    pict
        .transition().duration(speed_animation)
        .ease(d3.easeLinear)
        .attr("transform", `translate(${300},${300}) rotate(90)`)
        .attrTween("transform", translateAlong(path.node(),degree))
};

let clear_ALL = () => {
    svg.selectAll("*").remove();
};

function create_Path(x_pos, y_pos) {
    let data = [];
    for (let t = -20.5; t <= 20; t += 0.5) {
        data.push(
            {
                x: x_pos + 10 * t,
                y: y_pos + t**2 + t,
            }
        );
    }
    return data;
}


let drawPath = (x_pos, y_pos) => {
    const dataPoints = create_Path(x_pos, y_pos);
    const line = d3.line().x((d) => d.x).y((d) => d.y);
    const path = svg.append("path").attr("d", line(dataPoints)).attr("stroke", "black").attr("fill", "none");
    return path;
};

function translateAlong(path,degree) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            let { x, y } = path.getPointAtLength(t * length);
            return `translate(${x},${y}) rotate(${0}) scale(${degree!=1?t:degree})`;
        };
    };
}