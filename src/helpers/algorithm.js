export const quickSort = (list, comp) => {
    if (list.length <= 1) return list;
    const pivot = list[0];
    const minor = [];
    const greater = [];
     for (let i = 1; i < list.length; ++i) {
        if (comp(list[i], pivot)) {
            minor.push(list[i]);
        } else {
            greater.push(list[i]);
        }                
    }

    return quickSort(minor, comp).concat([pivot]).concat(quickSort(greater, comp));
}