import React from "react";
import SortableTree, {
  toggleExpandedForAll
} from "react-sortable-tree-patch-react-17";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";


const treeData = [
  {
    title: "属性グループ A",
    expanded: true,
    style: {
      padding: "0px"
    },
    children: [
      {
        title: "属性グループ A1"
      },
      {
        title: "属性グループ A2"
      }
    ]
  },
  {
    expanded: true,
    title: "属性グループ B",
    children: [
      {
        expanded: true,
        title: "属性グループ B1",
        children: [{ title: "属性グループ B1.1" }]
      }
    ]
  },
  {
    title: "属性グループ C"
  },
  {
    title: "属性グループ D",
    children: [
      {
        title: "属性グループ D1",
        children: [
          { title: "属性グループ D1.1" },
          { title: "属性グループ D1.2" }
        ]
      }
    ]
  }
];

export default class App extends React.Component {
  state = {
    searchString: "",
    searchFocusIndex: 0,
    searchFoundCount: null,
    treeData
  };

  handleTreeOnChange = (treeData) => {
    this.setState({ treeData });
  };

  handleSearchOnChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0
    });
  };

  toggleNodeExpansion = (expanded) => {
    this.setState((prevState) => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded
      })
    }));
  };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    return (
      <div className="wrapper">
        <div className="tree-wrapper">
          <SortableTree
            theme={FileExplorerTheme}
            rowHeight={35}
            treeData={treeData}
            onChange={this.handleTreeOnChange}
            onMoveNode={({ node, treeIndex, path }) =>
              global.console.debug(
                "node:",
                node,
                "treeIndex:",
                treeIndex,
                "path:",
                path
              )
            }
            maxDepth={3}
            // searchQuery={searchString}
            // searchFocusOffset={searchFocusIndex}
            // canDrag={({ node }) => !node.noDragging}
            // canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
            // searchFinishCallback={(matches) =>
            //   this.setState({
            //     searchFoundCount: matches.length,
            //     searchFocusIndex:
            //       matches.length > 0 ? searchFocusIndex % matches.length : 0
            //   })
            // }
            isVirtualized={true}
            // generateNodeProps={rowInfo => ({
            //   buttons: [
            //     <button
            //       className="btn btn-outline-success"
            //       style={{
            //         verticalAlign: 'middle',
            //       }}
            //       onClick={() => alertNodeInfo(rowInfo)}
            //     >
            //       ℹ
            //     </button>,
            //   ],
            // })}
          />
        </div>
      </div>
    );
  }
}
