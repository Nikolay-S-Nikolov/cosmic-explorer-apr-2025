export function selectType(type) {
    const allTypes = [
        { value: '---' },
        { value: 'Inner' },
        { value: 'Outer' },
        { value: 'Dwarf' },
    ];

    allTypes.forEach(t => { t.selected = t.value === type });
    return allTypes;
}