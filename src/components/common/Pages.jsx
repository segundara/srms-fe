
const Pages = (total, perPage, setTotalPages, userTitle) => {
    const pages = [];
    if (userTitle === "tutor") {
        for (let i = 0; i < total.length; i++) {
            const element = total[i];
            let innerPages = [];
            for (let j = 1; j <= Math.ceil(element / perPage); j++) {
                innerPages.push(j);
            }
            pages.push(innerPages);
        }
    }
    else {
        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pages.push(i);
        }
    }
    setTotalPages(pages);
};

export default Pages;