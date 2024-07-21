import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../context/context";
import PageButton from "./UI/pageButton/PageButton";

const Pages = observer(() => {
    const { productStore } = useContext(Context);
    const pageCount = Math.ceil(productStore.totalCount / productStore.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div className="main__pages">
            {pages.map(page =>
                <PageButton key={page} active={productStore.page === page} onClick={() => productStore.setPage(page)}>{page}</PageButton>
            )}
        </div>
    )
})

export default Pages;