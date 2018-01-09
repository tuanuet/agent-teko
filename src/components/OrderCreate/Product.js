import React, { PureComponent } from 'react'
import Progress from './Progress'
import SearchProduct from './List/SearchProduct'
import OrderProduct from './List/OrderProduct'
import { numberWithCommas } from 'Helper'

class Product extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            shouldShowSearchResult: false,
            searchValue: '',
            error: ''
        }
        this.timer = null
    }
    componentDidMount() {
        const { actions } = this.props
    }
    searchProducts = () => {
        const { actions } = this.props
        const { searchValue } = this.state
        const offset = 0, limit = 10
        if (searchValue === '') return false
        this.setState({
            isSearching: true
        }, () => {
            actions.fetchSearchProducts(searchValue, offset, limit).then(() => {
                this.setState({
                    isSearching: false,
                    shouldShowSearchResult: true
                })
            })
        })
    }
    handleEnterSearchProducts = e => {
        if (e.keyCode === 13) {
            clearTimeout(this.timer)
            this.searchProducts()
        } else if (e.keyCode === 40) {
            e.preventDefault()
            if (this.searchResult.hasChildNodes()) {
                this.searchResult.firstChild.focus()
            }
        }
    }
    handleChangeSearchValue = e => {
        e.preventDefault()
        const value = e.target.value
        clearTimeout(this.timer)
        this.setState({
            searchValue: value
        }, () => {
            if (value === '') {
                this.setState({
                    shouldShowSearchResult: false
                })
                return
            }
            this.timer = setTimeout(() => {
                this.searchProducts()
            }, 750)
        })
    }
    addProductToOrder = product => {
        const { actions } = this.props
        this.setState({
            shouldShowSearchResult: false,
            searchValue: '',
            error: ''
        }, () => {
            this.searchInput.focus()
            actions.addProductToOrder(product)
        })
    }
    toggleShouldShowSearchResult = () => {
        this.setState(prevState => ({
            shouldShowSearchResult: !prevState.shouldShowSearchResult
        }))
    }
    verifyChangeStep = () => {
        const { changeStep, order: { orderProducts } } = this.props
        if (orderProducts.length === 0) {
            this.setState({
                error: 'Giỏ hàng trống. Vui lòng thêm sản phẩm để tiếp tục.'
            })
        } else {
            changeStep('customer')
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        const { isSearching, searchValue, shouldShowSearchResult, error } = this.state
        const { step, toggleShowOrderCreate, order, actions } = this.props
        const { customer, orderProducts, searchProducts } = order

        let totalPrice = 0
        orderProducts.forEach(product => {
            const { price, count } = product
            totalPrice += price * count
        })

        return <div>
            {/* Title */}
            <div className="row">
                <div className="col-12 title text-center text-uppercase font-weight-bold">Thông tin giỏ hàng</div>
                <span className="close-order-create text-danger" onClick={toggleShowOrderCreate}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
            {/* Progress */}
            <Progress step={step} />
            {/* Search products */}
            <div className="row no-gutters">
                <div className="col-10 offset-1 search-product">
                    { isSearching ?
                        <i className="fa fa-spin fa-circle-o-notch text-primary" aria-hidden="true"></i> : !shouldShowSearchResult ? <i className="fa fa-search clickable" aria-hidden="true" onClick={this.searchProducts}></i> :
                        <i className="fa fa-times clickable text-danger"
                            aria-hidden="true"
                            onClick={this.toggleShouldShowSearchResult}></i> }

                    <input className="slide-input form-control"
                        value={searchValue}
                        onKeyDown={this.handleEnterSearchProducts}
                        onChange={this.handleChangeSearchValue}
                        placeholder="Tìm kiếm sản phẩm"
                        ref={node => this.searchInput = node} />
                    { shouldShowSearchResult && <div className="search-result" ref={node => this.searchResult = node}>
                        { Array.isArray(searchProducts) ? searchProducts.length === 0 ? <div className="text-center">
                            <img className="img-fluid w-75" src="/images/not-found.jpg" />
                            <div className="product-empty-warning pb-4">
                                Không tìm thấy sản phẩm nào phù hợp!
                            </div>
                        </div> : searchProducts.map(product => <SearchProduct key={product.id}
                            product={product}
                            addProductToOrder={this.addProductToOrder} />) : false }
                    </div> }
                </div>
            </div>
            {/* Show all products */}
            <div className="order-product">
                { orderProducts.length === 0 ? <div className="row">
                    <div className="col-12">
                        <img className="img-fluid w-75 pt-5 pb-4 rounded mx-auto d-block" src="/images/giohangtrong-lg.png" />
                        <div className="product-empty-warning pb-4 text-center">
                            Giỏ hàng trống
                        </div>
                    </div>
                </div> : orderProducts.map(product => <OrderProduct key={product.id}
                    product={product}
                    actions={actions} />) }
            </div>

            <div className="bottom-align">
                { orderProducts.length > 0 && <div className="col-12 total-price text-center">
                    Tổng giá trị đơn hàng: { numberWithCommas(totalPrice) } đồng
                </div> }
                { error && <div className="col-12 text-center text-danger error-text">
                    <i className="fa fa-exclamation-triangle pr-2" aria-hidden="true"></i>
                    { error }
                </div> }
                <div className="col-12">
                    <button type="button"
                        className="btn btn-outline-info btn-block clickable"
                        onClick={this.verifyChangeStep}>
                        Xác nhận giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Product
