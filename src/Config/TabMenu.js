const tabs = [
    { code: 'SUMMARY', title: 'Summary', description: 'Pie charts for incoming and outgoing transactions' },
    { code: 'STATEMENTS', title: 'Statements', description: 'Table to explore all bank statements' },
    { code: 'CATEGORIES', title: 'Statistics', description: 'Bar charts grouped by categories' },
]

export function getTabMenu() {
    return tabs;
}
