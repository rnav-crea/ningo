console.log("Script loaded");

async function search() {
    const query = document.getElementById("query").value.trim();
    const resultDiv = document.getElementById("result-bar");
    const cleanedQuery = clearQuerys(query);

    console.log("Raw query:", query);
    console.log("Cleaned query:", cleanedQuery);

    resultDiv.innerHTML = "Searching...";

    let finalQuery = cleanedQuery;
    let wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(finalQuery)}`;

    try {
        let response = await fetch(wikiUrl);

        if (!response.ok) {
            const suggestion = await getSpellSugestions(cleanedQuery);

            if (suggestion && suggestion.toLowerCase() !== cleanedQuery.toLowerCase()) {
                finalQuery = suggestion;
                wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(finalQuery)}`;
                response = await fetch(wikiUrl);

                if (!response.ok) {
                    resultDiv.innerHTML = `<p>No results found for "<b>${finalQuery}</b>". Please try another query.</p>`;
                    return;
                }
            } else {
                resultDiv.innerHTML = `<p>No results found for "<b>${cleanedQuery}</b>". Please try another query.</p>`;
                return;
            }
        }

        const data = await response.json();

        resultDiv.innerHTML = displayWikiResult(data);
    } catch (error) {
        resultDiv.innerHTML = `<p>Unable to connect. Please check your internet connection and try again.</p>`;
        console.error(error);
    }
}

// Spell suggestion using Datamuse
async function getSpellSugestions(query) {
    try {
        const res = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.length > 0) return data[0].word;
    } catch (e) {
        console.error("Spell suggestion error:", e);
    }
    return query;
}

// Display summary and read more button
function displayWikiResult(data) {
    let html = `<h2>${data.title}</h2>`;

    if (data.thumbnail && data.thumbnail.source) {
        html += `<img src="${data.thumbnail.source}" alt="${data.title} image">`;
    }

    html += `<p>${data.extract}</p>`;
    html += `<button id="read-more-btn">Read More</button>`;

    // Return the HTML immediately
    // Then add event listener outside this function or after innerHTML update

    setTimeout(() => {
        const readMoreBtn = document.getElementById("read-more-btn");
        if (readMoreBtn) {
            readMoreBtn.addEventListener("click", () => {
                const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`;
                document.getElementById("result-bar").innerHTML = `
                    <div class="iframe-wrapper">
                        <iframe src="${pageUrl}" allowfullscreen></iframe>
                        </div>
                `;
            });
        }
    }, 100);

    return html;
}

// Clean unnecessary words
function clearQuerys(query) {
    return query
        .replace(/\b(explain|about|what is|tell me|who is|define|give me|give|meaning of|details of|notes|a|an|the|are|when|where|why|who)\b/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// Listeners
document.getElementById("search-btn").addEventListener("click", search);
document.getElementById("query").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        search();
    }
});
