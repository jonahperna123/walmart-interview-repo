import React from 'react'
import Issue from './Issue'
import ReactPaginate from 'react-paginate';
import './ParentIssue.css'



class ParentIssue extends React.Component {
    constructor(props) {
        super(props);

        this.totalNumberOfIssues = 0;
        this.issues = []
        this.state = {
            data: [],
            currentPage: 0,
            pageCount: 0,
            perPage: 10,
            offset: 0,
            showSpecificIssue: false,
            specificIssueIdx: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleIssueClick = this.handleIssueClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
    }

    componentDidMount() {
        const url = 'https://api.github.com/repos/walmartlabs/thorax/issues';

        //execute call to github API
        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            }).then((data) => {
                this.totalNumberOfIssues = data.length;
                const pageCount = Math.ceil(data.length / 10)
                this.issues = data;
                let issuesShown = 10;
                let dataIssues = []
                
                
                
                if (this.totalNumberOfIssues < 10) {
                    issuesShown = this.totalNumberOfIssues;
                } 

                for (let i = 0; i < issuesShown; ++i) {
                    dataIssues.push(
                        <Issue data={this.issues[i]} 
                                issueIdx={i} 
                                key={i} 
                                onClick={this.handleIssueClick}
                                showDetails={false}
                                />
                    )
                }

                console.log(data)

                this.setState({
                    data: dataIssues,
                    pageCount: pageCount
                });
            }).catch((error) => console.log(error));
        
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        const total_data_length = this.issues.length;

        let data = [];
        for (let i = offset; i < offset + 10; ++i) {
            if (i >= total_data_length) break;
            data.push(
                <Issue data={this.issues[i]} 
                        issueIdx={i} 
                        key={i} 
                        onClick={this.handleIssueClick} 
                        showDetails={false}
                        />
            )
        }

        this.setState({
            currentPage: selectedPage,
            offset: offset,
            data: data
        });
    }

    handleIssueClick = (issueNum) => {
        this.setState({
            showSpecificIssue: true,
            specificIssueIdx: issueNum
        });
    }
    handleBackButtonClick = () => {
        this.setState({
            showSpecificIssue: false
        });
    }
    


    render () {
        const { pageCount, data, showSpecificIssue, currentPage } = this.state;

        let rendered_info = null;
        if (data && !showSpecificIssue) {
            rendered_info = 
            <div>
                {data}
                
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    initialPage={currentPage}
                    />
                    
            </div>
        }
        if (data && showSpecificIssue) {
            rendered_info = 
                <div>
                    <Issue data={this.issues[this.state.specificIssueIdx]} 
                        issueIdx={this.state.specificIssueIdx} 
                        key={this.state.specificIssueIdx} 
                        onClick={this.handleIssueClick} 
                        showDetails={true}
                        />
                    <button onClick={this.handleBackButtonClick}>Back</button>
                </div>
        }

        return (
            <div>
                <h1>Walmart Labs Thorax Issues</h1>
                <div>
                    {rendered_info}
                 </div>
                
            </div>
        )
    }
}

export default ParentIssue;