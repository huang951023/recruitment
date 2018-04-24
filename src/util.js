
export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : '/genuis';
    if (!avatar) url += 'info'
    return url
}

export const getChatId = (form, to) => [form, to].sort().join('_')