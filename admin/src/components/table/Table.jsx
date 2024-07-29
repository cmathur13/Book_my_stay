import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import { getCurrency, formatAmount } from "../../utils/utils";

const List = ({ reservationData = [] }) => {
  const { data: hotelData, loading, error } = useFetch(`/hotels`);

  let hotelMap = new Map();

  hotelData.forEach((hotel) => {
    hotelMap.set(hotel._id, hotel.name);
  });

  console.log("🚀 ~ file: Table.jsx:14 ~ List ~ hotelData", hotelData);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Hotel ID</TableCell>
            <TableCell className="tableCell">Check in Date</TableCell>
            <TableCell className="tableCell">Check out Date</TableCell>
            <TableCell className="tableCell">Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservationData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">
                {hotelMap.get(row.hotelId) || "Test Hotel"}
              </TableCell>
              <TableCell className="tableCell">
                {new Date(row.startDate).toDateString().slice(4)}
              </TableCell>
              <TableCell className="tableCell">
                {new Date(row.endDate).toDateString().slice(4)}
              </TableCell>
              <TableCell className="tableCell">
                {getCurrency() + row.total.toLocaleString("en-IN")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
