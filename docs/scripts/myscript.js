//const margins = {top: 20, right: 50, bottom: 60, left: 350}
const margins = {top: 20, right: 50, bottom: 60, left: 25}
const chart_width = 1300 - margins.left - margins.right
const chart_height = 700 - margins.top - margins.bottom

const chart_svg = d3.select("div#plot").append("svg")
    .attr("width", chart_width + margins.left + margins.right)
    .attr("height", chart_height + margins.top + margins.bottom)
    .append("g")
    .attr("transform", `translate(${margins.left},${margins.top})`)

const year_text = chart_svg.append("text")
    .attr("class", "year")
    .attr("x", chart_width - 80)
    .attr("y", chart_height + margins.bottom - 80)
    .text("")

// python -m http.server 8000
// http://localhost:8000/test.html
/*d3.csv("../data/bar_chart_race_data_v2.csv").then(df => {
    console.log("Data Loaded:", df)

    df = df.filter(row => row.cipcode_label && row.total_graduates && row.grad_cohort)
    df.forEach(row => {
        row.total_graduates = +row.total_graduates
        row.grad_cohort = +row.grad_cohort
    })*/

const df = [
    {'grad_cohort': 2001, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 604875},
    {'grad_cohort': 2001, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 476198},
    {'grad_cohort': 2001, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 373881},
    {'grad_cohort': 2001, 'cipcode_label': 'Education', 'total_graduates': 295499},
    {'grad_cohort': 2001, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 114631},
    {'grad_cohort': 2001, 'cipcode_label': 'Engineering', 'total_graduates': 112943},
    {'grad_cohort': 2001, 'cipcode_label': 'Social Sciences', 'total_graduates': 110145},
    {'grad_cohort': 2001, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 106197},
    {'grad_cohort': 2001, 'cipcode_label': 'Computer and Information Sciences and Support Services', 'total_graduates': 98292},
    {'grad_cohort': 2001, 'cipcode_label': 'Psychology', 'total_graduates': 83725},
    {'grad_cohort': 2001, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 80953},
    {'grad_cohort': 2001, 'cipcode_label': 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services', 'total_graduates': 68369},
    {'grad_cohort': 2001, 'cipcode_label': 'Engineering/Engineering-Related Technologies/Technicians', 'total_graduates': 66617},
    {'grad_cohort': 2001, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 66286},
    {'grad_cohort': 2001, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 65711},
    {'grad_cohort': 2001, 'cipcode_label': 'Psychology, General', 'total_graduates': 58624},
    {'grad_cohort': 2001, 'cipcode_label': 'English Language and Literature/Letters', 'total_graduates': 54471},
    {'grad_cohort': 2001, 'cipcode_label': 'Practical Nursing, Vocational Nursing and Nursing Assistants', 'total_graduates': 53301},
    {'grad_cohort': 2001, 'cipcode_label': 'Public Administration and Social Service Professions', 'total_graduates': 53128},
    {'grad_cohort': 2001, 'cipcode_label': 'Criminal Justice and Corrections', 'total_graduates': 52774},
    {'grad_cohort': 2004, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 281894},
    {'grad_cohort': 2004, 'cipcode_label': 'Social Sciences', 'total_graduates': 119731},
    {'grad_cohort': 2004, 'cipcode_label': 'Education', 'total_graduates': 101842},
    {'grad_cohort': 2004, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 83611},
    {'grad_cohort': 2004, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 82250},
    {'grad_cohort': 2004, 'cipcode_label': 'Psychology', 'total_graduates': 82120},
    {'grad_cohort': 2004, 'cipcode_label': 'Psychology, General', 'total_graduates': 77783},
    {'grad_cohort': 2004, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 75042},
    {'grad_cohort': 2004, 'cipcode_label': 'Engineering', 'total_graduates': 72736},
    {'grad_cohort': 2004, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 72511},
    {'grad_cohort': 2004, 'cipcode_label': 'History', 'total_graduates': 65836},
    {'grad_cohort': 2004, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 64683},
    {'grad_cohort': 2004, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 63025},
    {'grad_cohort': 2004, 'cipcode_label': 'Teacher Education and Professional Development, Specific Levels and Methods', 'total_graduates': 57303},
    {'grad_cohort': 2004, 'cipcode_label': 'English Language and Literature/Letters', 'total_graduates': 52091},
    {'grad_cohort': 2004, 'cipcode_label': 'Biology, General', 'total_graduates': 46828},
    {'grad_cohort': 2004, 'cipcode_label': 'English Language and Literature, General', 'total_graduates': 41381},
    {'grad_cohort': 2004, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 40734},
    {'grad_cohort': 2004, 'cipcode_label': 'Marketing', 'total_graduates': 39885},
    {'grad_cohort': 2004, 'cipcode_label': 'Accounting and Related Services', 'total_graduates': 39804},
    {'grad_cohort': 2006, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 827396},
    {'grad_cohort': 2006, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 512911},
    {'grad_cohort': 2006, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 345539},
    {'grad_cohort': 2006, 'cipcode_label': 'Education', 'total_graduates': 290669},
    {'grad_cohort': 2006, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 125013},
    {'grad_cohort': 2006, 'cipcode_label': 'Practical Nursing, Vocational Nursing and Nursing Assistants', 'total_graduates': 87364},
    {'grad_cohort': 2006, 'cipcode_label': 'Engineering', 'total_graduates': 79430},
    {'grad_cohort': 2006, 'cipcode_label': 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services', 'total_graduates': 72669},
    {'grad_cohort': 2006, 'cipcode_label': 'Computer and Information Sciences and Support Services', 'total_graduates': 66506},
    {'grad_cohort': 2006, 'cipcode_label': 'Legal Professions and Studies', 'total_graduates': 64018},
    {'grad_cohort': 2006, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 63541},
    {'grad_cohort': 2006, 'cipcode_label': 'Engineering/Engineering-Related Technologies/Technicians', 'total_graduates': 62796},
    {'grad_cohort': 2006, 'cipcode_label': 'Public Administration and Social Service Professions', 'total_graduates': 62794},
    {'grad_cohort': 2006, 'cipcode_label': 'Allied Health Diagnostic, Intervention, and Treatment Professions', 'total_graduates': 60585},
    {'grad_cohort': 2006, 'cipcode_label': 'Mechanic and Repair Technologies/Technicians', 'total_graduates': 55366},
    {'grad_cohort': 2006, 'cipcode_label': 'Criminal Justice and Corrections', 'total_graduates': 50448},
    {'grad_cohort': 2006, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 48272},
    {'grad_cohort': 2006, 'cipcode_label': 'Law', 'total_graduates': 46767},
    {'grad_cohort': 2006, 'cipcode_label': 'Family and Consumer Sciences/Human Sciences', 'total_graduates': 37096},
    {'grad_cohort': 2006, 'cipcode_label': 'Agricultural/Animal/Plant/Veterinary Science and Related Fields', 'total_graduates': 35339},
    {'grad_cohort': 2007, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 311938},
    {'grad_cohort': 2007, 'cipcode_label': 'Social Sciences', 'total_graduates': 137928},
    {'grad_cohort': 2007, 'cipcode_label': 'Education', 'total_graduates': 107557},
    {'grad_cohort': 2007, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 99449},
    {'grad_cohort': 2007, 'cipcode_label': 'Psychology', 'total_graduates': 96756},
    {'grad_cohort': 2007, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 93972},
    {'grad_cohort': 2007, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 92932},
    {'grad_cohort': 2007, 'cipcode_label': 'Psychology, General', 'total_graduates': 90178},
    {'grad_cohort': 2007, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 83698},
    {'grad_cohort': 2007, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 82761},
    {'grad_cohort': 2007, 'cipcode_label': 'Engineering', 'total_graduates': 79075},
    {'grad_cohort': 2007, 'cipcode_label': 'History', 'total_graduates': 78364},
    {'grad_cohort': 2007, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 74855},
    {'grad_cohort': 2007, 'cipcode_label': 'Biology, General', 'total_graduates': 60367},
    {'grad_cohort': 2007, 'cipcode_label': 'English Language and Literature/Letters', 'total_graduates': 58599},
    {'grad_cohort': 2007, 'cipcode_label': 'Teacher Education and Professional Development, Specific Levels and Methods', 'total_graduates': 57981},
    {'grad_cohort': 2007, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 56771},
    {'grad_cohort': 2007, 'cipcode_label': 'Accounting and Related Services', 'total_graduates': 49114},
    {'grad_cohort': 2007, 'cipcode_label': 'English Language and Literature, General', 'total_graduates': 46256},
    {'grad_cohort': 2007, 'cipcode_label': 'Political Science and Government', 'total_graduates': 44103},
    {'grad_cohort': 2010, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 383314},
    {'grad_cohort': 2010, 'cipcode_label': 'Social Sciences', 'total_graduates': 166114},
    {'grad_cohort': 2010, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 148264},
    {'grad_cohort': 2010, 'cipcode_label': 'Psychology', 'total_graduates': 121201},
    {'grad_cohort': 2010, 'cipcode_label': 'Education', 'total_graduates': 119351},
    {'grad_cohort': 2010, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 118557},
    {'grad_cohort': 2010, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 115592},
    {'grad_cohort': 2010, 'cipcode_label': 'Psychology, General', 'total_graduates': 113788},
    {'grad_cohort': 2010, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 105793},
    {'grad_cohort': 2010, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 104318},
    {'grad_cohort': 2010, 'cipcode_label': 'Engineering', 'total_graduates': 100855},
    {'grad_cohort': 2010, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 90568},
    {'grad_cohort': 2010, 'cipcode_label': 'History', 'total_graduates': 90392},
    {'grad_cohort': 2010, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 87606},
    {'grad_cohort': 2010, 'cipcode_label': 'Biology, General', 'total_graduates': 75708},
    {'grad_cohort': 2010, 'cipcode_label': 'English Language and Literature/Letters', 'total_graduates': 64892},
    {'grad_cohort': 2010, 'cipcode_label': 'Teacher Education and Professional Development, Specific Levels and Methods', 'total_graduates': 64797},
    {'grad_cohort': 2010, 'cipcode_label': 'Accounting and Related Services', 'total_graduates': 64775},
    {'grad_cohort': 2010, 'cipcode_label': 'Communication and Media Studies', 'total_graduates': 56771},
    {'grad_cohort': 2010, 'cipcode_label': 'English Language and Literature, General', 'total_graduates': 54896},
    {'grad_cohort': 2011, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 1427583},
    {'grad_cohort': 2011, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 765356},
    {'grad_cohort': 2011, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 505646},
    {'grad_cohort': 2011, 'cipcode_label': 'Education', 'total_graduates': 345005},
    {'grad_cohort': 2011, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 163096},
    {'grad_cohort': 2011, 'cipcode_label': 'Practical Nursing, Vocational Nursing and Nursing Assistants', 'total_graduates': 131303},
    {'grad_cohort': 2011, 'cipcode_label': 'Computer and Information Sciences and Support Services', 'total_graduates': 123651},
    {'grad_cohort': 2011, 'cipcode_label': 'Engineering', 'total_graduates': 116227},
    {'grad_cohort': 2011, 'cipcode_label': 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services', 'total_graduates': 114500},
    {'grad_cohort': 2011, 'cipcode_label': 'Engineering/Engineering-Related Technologies/Technicians', 'total_graduates': 106416},
    {'grad_cohort': 2011, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 104100},
    {'grad_cohort': 2011, 'cipcode_label': 'Mechanic and Repair Technologies/Technicians', 'total_graduates': 98495},
    {'grad_cohort': 2011, 'cipcode_label': 'Public Administration and Social Service Professions', 'total_graduates': 94126},
    {'grad_cohort': 2011, 'cipcode_label': 'Allied Health Diagnostic, Intervention, and Treatment Professions', 'total_graduates': 84786},
    {'grad_cohort': 2011, 'cipcode_label': 'Criminal Justice and Corrections', 'total_graduates': 82373},
    {'grad_cohort': 2011, 'cipcode_label': 'Legal Professions and Studies', 'total_graduates': 73993},
    {'grad_cohort': 2011, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 69687},
    {'grad_cohort': 2011, 'cipcode_label': 'Vehicle Maintenance and Repair Technologies/Technicians', 'total_graduates': 64015},
    {'grad_cohort': 2011, 'cipcode_label': 'Allied Health and Medical Assisting Services', 'total_graduates': 58703},
    {'grad_cohort': 2011, 'cipcode_label': 'Psychology', 'total_graduates': 50731},
    {'grad_cohort': 2013, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 391848},
    {'grad_cohort': 2013, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 204109},
    {'grad_cohort': 2013, 'cipcode_label': 'Social Sciences', 'total_graduates': 168609},
    {'grad_cohort': 2013, 'cipcode_label': 'Psychology', 'total_graduates': 139206},
    {'grad_cohort': 2013, 'cipcode_label': 'Psychology, General', 'total_graduates': 130712},
    {'grad_cohort': 2013, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 125487},
    {'grad_cohort': 2013, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 125042},
    {'grad_cohort': 2013, 'cipcode_label': 'Engineering', 'total_graduates': 124071},
    {'grad_cohort': 2013, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 121183},
    {'grad_cohort': 2013, 'cipcode_label': 'Education', 'total_graduates': 114948},
    {'grad_cohort': 2013, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 110587},
    {'grad_cohort': 2013, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 109232},
    {'grad_cohort': 2013, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 93365},
    {'grad_cohort': 2013, 'cipcode_label': 'Biology, General', 'total_graduates': 86843},
    {'grad_cohort': 2013, 'cipcode_label': 'History', 'total_graduates': 80756},
    {'grad_cohort': 2013, 'cipcode_label': 'Accounting and Related Services', 'total_graduates': 66951},
    {'grad_cohort': 2013, 'cipcode_label': 'Teacher Education and Professional Development, Specific Levels and Methods', 'total_graduates': 61057},
    {'grad_cohort': 2013, 'cipcode_label': 'English Language and Literature/Letters', 'total_graduates': 61005},
    {'grad_cohort': 2013, 'cipcode_label': 'Communication and Media Studies', 'total_graduates': 60678},
    {'grad_cohort': 2013, 'cipcode_label': 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services', 'total_graduates': 59945},
    {'grad_cohort': 2016, 'cipcode_label': 'Liberal Arts/Sciences, G.S. & Humanities', 'total_graduates': 1883360},
    {'grad_cohort': 2016, 'cipcode_label': 'Health Professions and Related Programs', 'total_graduates': 1048085},
    {'grad_cohort': 2016, 'cipcode_label': 'Business, Management, Marketing', 'total_graduates': 996054},
    {'grad_cohort': 2016, 'cipcode_label': 'Education', 'total_graduates': 443091},
    {'grad_cohort': 2016, 'cipcode_label': 'Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing', 'total_graduates': 301117},
    {'grad_cohort': 2016, 'cipcode_label': 'Engineering', 'total_graduates': 299478},
    {'grad_cohort': 2016, 'cipcode_label': 'Business Administration, Management and Operations', 'total_graduates': 268011},
    {'grad_cohort': 2016, 'cipcode_label': 'Computer and Information Sciences and Support Services', 'total_graduates': 263265},
    {'grad_cohort': 2016, 'cipcode_label': 'Social Sciences', 'total_graduates': 210624},
    {'grad_cohort': 2016, 'cipcode_label': 'Psychology', 'total_graduates': 198894},
    {'grad_cohort': 2016, 'cipcode_label': 'Biological and Biomedical Sciences', 'total_graduates': 194133},
    {'grad_cohort': 2016, 'cipcode_label': 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services', 'total_graduates': 180641},
    {'grad_cohort': 2016, 'cipcode_label': 'Visual and Performing Arts', 'total_graduates': 163359},
    {'grad_cohort': 2016, 'cipcode_label': 'Psychology, General', 'total_graduates': 143508},
    {'grad_cohort': 2016, 'cipcode_label': 'Communication, Journalism, and Related Programs', 'total_graduates': 143446},
    {'grad_cohort': 2016, 'cipcode_label': 'Engineering/Engineering-Related Technologies/Technicians', 'total_graduates': 141668},
    {'grad_cohort': 2016, 'cipcode_label': 'Criminal Justice and Corrections', 'total_graduates': 140281},
    {'grad_cohort': 2016, 'cipcode_label': 'Public Administration and Social Service Professions', 'total_graduates': 138138},
    {'grad_cohort': 2016, 'cipcode_label': 'Accounting and Related Services', 'total_graduates': 112729},
    {'grad_cohort': 2016, 'cipcode_label': 'Mechanic and Repair Technologies/Technicians', 'total_graduates': 104577}
];
    const x_scale = d3.scaleLinear().range([0, chart_width * 0.75]) //text issue - scale it
    const y_scale = d3.scaleBand().range([0, chart_height]).padding(0.1)
    const color_scale = d3.scaleOrdinal().domain(df.map(row => row.cipcode_label)).range(df.map((_, i) => d3.hsl((i * 30) % 360, 0.5, 0.7).toString())); // modify hue saturation brightness
    //d3.scaleOrdinal(d3.schemeCategory10)
    
    const xAxis = d3.axisBottom().scale(x_scale);
    d3.select("svg").append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${margins.left}, ${chart_height + margins.top})`)
        .call(xAxis);

    
    const year_list = [...new Set(df.map(row => row.grad_cohort))].sort()
    console.log("years:", year_list)
    
    let current_year_idx = 0
    
document.addEventListener("DOMContentLoaded", () => {
    let animation_running = true; 
    let animation_timeout; 

    function draw_chart(year_idx) {
        const year = year_list[year_idx];
        const filtered_df = df.filter(row => row.grad_cohort === year)
            .sort((a, b) => b.total_graduates - a.total_graduates);

        x_scale.domain([0, d3.max(filtered_df, row => row.total_graduates)]);
        y_scale.domain(filtered_df.map(row => row.cipcode_label));

        const bars = chart_svg.selectAll(".bar")
            .data(filtered_df, row => row.cipcode_label);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", row => y_scale(row.cipcode_label))
            .attr("height", y_scale.bandwidth())
            .attr("x", 0)
            .attr("width", 0)
            .style("fill", row => color_scale(row.cipcode_label))
          .merge(bars)
            .transition().duration(2000)
            .attr("y", row => y_scale(row.cipcode_label))
            .attr("width", row => x_scale(row.total_graduates));

        bars.exit().remove();

        const labels = chart_svg.selectAll(".label")
            .data(filtered_df, row => row.cipcode_label);

        labels.enter()
            .append("text")
            .attr("class", "label")
            .attr("y", row => y_scale(row.cipcode_label) + y_scale.bandwidth() / 2)
            .attr("x", 5)
            .attr("dy", ".35em")
            .text(row => `${row.cipcode_label} (${d3.format(",")(row.total_graduates)})`)
          .merge(labels)
            .transition().duration(2000)
            .attr("y", row => y_scale(row.cipcode_label) + y_scale.bandwidth() / 2)
            .attr("x", row => x_scale(row.total_graduates) + 5)
            .text(row => `${row.cipcode_label} (${d3.format(",")(row.total_graduates)})`);

        labels.exit().remove();

        year_text.text(year);
        
        d3.select(".xAxis")
          .transition()
          .duration(2000)
          .call(xAxis);
        
    }

    function run_animation() {
        if (!animation_running) return;

        draw_chart(current_year_idx);
        current_year_idx = (current_year_idx + 1) % year_list.length;

        animation_timeout = setTimeout(run_animation, 3000);
    }
console.log(document.getElementById("pause"))
    document.getElementById("pause").addEventListener("click", () => {
        animation_running = !animation_running;

        const button = document.getElementById("pause");
        if (animation_running) {
            button.textContent = "Pause";
            run_animation();
        } else {
            button.textContent = "Play";
            clearTimeout(animation_timeout); 
        }
    });
    
    document.getElementById("left").addEventListener("click", () => {
        clearTimeout(animation_timeout);
        animation_running = false;
        document.getElementById("pause").textContent = "Play";
        current_year_idx = (current_year_idx - 1 + year_list.length) % year_list.length;
        draw_chart(current_year_idx);
    });

    document.getElementById("right").addEventListener("click", () => {
        clearTimeout(animation_timeout);
        animation_running = false;
        document.getElementById("pause").textContent = "Play";
        current_year_idx = (current_year_idx + 1) % year_list.length;
        draw_chart(current_year_idx);
    });

    run_animation();
});