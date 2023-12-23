import React, { useState, useEffect, useContext } from 'react';
import Product from '../components/Product';
import StateContext, { ProductType } from '../contexts/StateContext';
import '../styles/pages/Products.css';

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [columns, setColumns] = useState<any[]>([[],[],[]]);
    const [pageNumber, setPageNumber] = useState(1);

    const { state, dispatch } = useContext(StateContext);

    const addToCart = (product: ProductType ) => {
        dispatch({ type: 'addToCart', payload: { product: product } });
    };

    useEffect(() => {
        function handleScroll() {
            if (
              window.innerHeight + document.documentElement.scrollTop >=
              document.documentElement.offsetHeight * 0.8
            ) {
              loadMorePhotos();
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMorePhotos = () => {
        setPageNumber(pageNumber => pageNumber + 1);
    };

    useEffect(() => {
        const loadProducts = async() => {
            try {
                const result = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=20`, {
                    headers: {
                        authorization: '0nw21ZJuB2wVXA2WFz6UOYy7OYaUyLR0ieHYlUDhWWkAoGPVxIqzXG3k',
                    }
                  });
                if (!result.ok) {
                    throw new Error('Error on result')
                }

                const data = await result.json();
                console.log(data);
                setProducts(products => [...products, ...data.photos]);
            } catch (error) {
                console.log('Error: ', error);
            }
        }

        loadProducts();
    }, [pageNumber]);

    useEffect(() => {
        const fillMasonryGrid = () => {
            const columns: any[][] = [[], [], []];

            products.forEach((product) => {
                const lowestValues = { height: Infinity, index: -1 };

                columns.forEach((column, index) => {
                    console.log("typeof: ", typeof column, index);
                    const columnHeight = column.reduce((totalHeight: number, item: any) => totalHeight + Number(item.height), 0)
                    if (columnHeight < lowestValues.height) {
                        lowestValues.height = columnHeight;
                        lowestValues.index = index;
                    }
                })

                columns[lowestValues.index].push(product);
                
            })
            setColumns(columns);
        }

        fillMasonryGrid();

    }, [products])

    return (
        <div className='products'>
            <div className='products-list'>
                { columns.map(column => (
                    <div> 
                        { column.map((product: any) => <Product product={product} addToCart={addToCart}/> )} 
                    </div>)
                )}
            </div>
        </div>
    )
}

export default Products;