export const naiveSentenceSplitter = (log) => {
    const sentences = [];
    for (const splited of log.split(/(\.\n)|(\n)|(\. )/)){
        if (splited && !splited.startsWith('.') && !splited.startsWith('\n') && splited.length > 10){
            sentences.push({
                sentence: splited,
                tags: []
            });
        }
    }
    return sentences;
}