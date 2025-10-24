export function selectRings(shoose) {
    const allTypes = [
        { value: '---' },
        { value: 'Yes' },
        { value: 'No' },
    ];
    allTypes.forEach(r => { r.selected = r.value === shoose });
    return allTypes;
}