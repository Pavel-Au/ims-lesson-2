import { PureComponent } from "react";
import { TableRow } from "../../components";
import "./DataTable.css";

export class DataTable extends PureComponent {
  constructor(props) {
    super(props);

    const extendedData = (this.props.dataSet || []).map((row) => ({
      ...row,
      active: false,
    }));

    this.state = {
      selectRowTimeIntervalId: null,
      totalRows: this.props.dataSet.length,
      selectedRows: this.getSelectedRowsCount(extendedData),
      data: extendedData,
    };
  }

  changeRowState = (index, active) => {
    const newData = [...this.state.data];
    newData[index].active = !active;
    this.setState((state) => ({
      ...state,
      selectedRows: this.getSelectedRowsCount(newData),
      data: newData,
    }));
  };

  getSelectedRowsCount = (dataArray = []) => {
    return dataArray.filter((row) => row.active).length;
  };

  triggerRandomRowSelection = () => {
    const interval = setInterval(() => {
      if (this.state.selectedRows === this.state.totalRows) {
        this.stopRandomRowSelection();
        return;
      }

      const newData = [...this.state.data];
      const filteredArray = newData.filter((row) => !row.active);
      const randomIndex = Math.floor(Math.random() * filteredArray.length);
      filteredArray[randomIndex].active = true;

      this.setState((state) => ({
        ...state,
        selectedRows: this.getSelectedRowsCount(newData),
        data: newData,
      }));
    }, 2000);

    this.setState((state) => ({
      ...state,
      selectRowTimeIntervalId: interval,
    }));
  };

  stopRandomRowSelection = () => {
    clearInterval(this.state.selectRowTimeIntervalId);
    this.setState((state) => ({
      ...state,
      selectRowTimeIntervalId: null,
    }));
  };

  componentDidMount() {
    this.triggerRandomRowSelection();
  }

  componentDidUpdate() {
    if (
      this.state.selectedRows !== this.state.totalRows &&
      !this.state.selectRowTimeIntervalId
    ) {
      this.triggerRandomRowSelection();
    }
  }

  componentWillUnmount() {
    this.stopRandomRowSelection();
  }

  render() {
    return (
      <table
        className={`data-table ${
          this.state.selectedRows === this.state.totalRows
            ? "all-data-selected"
            : this.state.selectedRows > this.state.totalRows / 2
            ? "half-data-selected"
            : ""
        }`}
      >
        <tbody>
          {this.state.data.map((element, index) => (
            <TableRow
              key={index}
              element={element}
              index={index}
              handleClick={() => this.changeRowState(index, element.active)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
