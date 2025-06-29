let text = draft.content;

function sortKalenderwochen(input) {
    const regex = /(KW \d+[\s\S]*?(?=(KW \d+|$)))/g;
    const wochen = [...input.matchAll(regex)].map(match => match[0]);

    const sortedWochen = wochen.sort((a, b) => {
        const numA = parseInt(a.match(/KW (\d+)/)[1], 10);
        const numB = parseInt(b.match(/KW (\d+)/)[1], 10);
        return numA - numB;
    });

    return sortedWochen.join("\n\n");
}

draft.content = sortKalenderwochen(text);
draft.update();