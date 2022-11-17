import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import './history.css';

export const ConversionHistory: React.FC = () => {
  let historicalData = JSON.parse(localStorage.getItem('conversion-history')!);
  const [historicalConversionData, setHistoricalData] = useState();

  function createEventData(
    amount: number,
    from: string,
    to: string,
    timestamp: Date
  ) {
    const event = `Converted an amount of ${amount} from ${from} to ${to} `
    const eventDateTime = `${new Date(timestamp).toLocaleDateString()} @ 
      ${new Date(timestamp).toLocaleTimeString([], 
        { hour: '2-digit', minute: '2-digit' })}`;
    return { timestamp: eventDateTime, event };
  }
  let rows: any = [];

  if (historicalData && historicalData.length > 0) {
    rows = historicalData.map((row: any) =>
      createEventData(row.amount,
        row.fromCurrency,
        row.toCurrency,
        row.timestamp))
  }

  function removeHistoryItem(index: number) {
    historicalData.splice(index, 1);
    localStorage.setItem('conversion-history', JSON.stringify(historicalData));
    historicalData = JSON.parse(localStorage.getItem('conversion-history')!);
    setHistoricalData(historicalData);
  }
  
  return (
    <div className='home'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Event</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length === 0 ?
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records found
                </TableCell>
              </TableRow>
              :
              rows && rows.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.timestamp}
                  </TableCell>
                  <TableCell align="left">{row.event}</TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      onClick={() => { removeHistoryItem(index) }}
                      fontSize='small'
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}