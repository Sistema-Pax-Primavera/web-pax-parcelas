import React, { useState } from "react";
import "./gerador.css";
import HeaderParcelas from "../../components/header-parcelas";
import Checkbox from "@mui/material/Checkbox";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ModalEdicao from "../../../../pax-cadastro/src/components/modal-edicao";

function createData(name, tipo, valor, vencimento, datapagamento) {
  return { name, tipo, valor, vencimento, datapagamento };
}

const initialRows = [
  createData("01", "Adesão", "100,00", "20/05/2024", "20/05/2024"),
  createData("02", "Mensalidade", "100,00", "21/05/2024", "21/05/2024"),
  createData("03", "Mensalidade", "100,00", "22/05/2024", "22/05/2024"),
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Gerador = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [modalCadastroOpen, setModalCadastro] = useState(false);

  const handleRowClick = (rowName) => {
    const selectedIndex = selectedRows.indexOf(rowName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (rowName) => selectedRows.indexOf(rowName) !== -1;

  const calculateTotalValue = () => {
    // Calculate the total value of selected rows
    return selectedRows.reduce((acc, curr) => {
      const selectedRow = rows.find((row) => row.name === curr);
      return acc + parseFloat(selectedRow.valor.replace(",", "."));
    }, 0);
  };

  const calculateDiscount = (value) => {
    // Calculate the total value of selected rows
    const totalValue = calculateTotalValue();

    // Calculate the discount amount
    return (totalValue * value) / 100;
  };

  const handleDiscountChange = (event) => {
    setDiscountPercentage(event.target.value);
  };

  const abrirModalCadastro = () => {
    setModalCadastro(true);
  };

  const fecharModalCadastro = () => {
    setModalCadastro(false);
  };
  return (
    <div className="container-parcelas">
      <HeaderParcelas />
      <div className="filtro-container-parcelas">
        <div className="container-linha-parcelas">
          <div className="linha-parcelas">
            <div className="campos-gerador-parcelas">
              <div>
                <Checkbox {...label} size="small" />
                <label>Mensalidades Vencidas</label>
              </div>
              <div>
                <Checkbox {...label} size="small" />
                <label>Mensalidades Adiantadas</label>
              </div>
            </div>
            <div className="campos-gerador-parcelas2">
              <label>Contrato</label>
              <input></input>
            </div>
            <div className="campos-gerador-parcelas3">
              <label>Unidade</label>
              <select></select>
            </div>
            <div className="campos-button-parcelas1">
              <ButtonIconTextoStart
                title={"PESQUISAR"}
                corFundoBotao={"#006B33"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corTextoBotao={"#ffff"}
              />
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Parcela</TableCell>
                <TableCell align="start">Tipo</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Vencimento</TableCell>
                <TableCell align="center">Data Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: isSelected(row.name)
                      ? "#006b33"
                      : "inherit",
                    color: isSelected(row.name) ? "#fff" : "inherit",
                  }}
                  onClick={() => handleRowClick(row.name)}
                >
                  <TableCell
                    align="start"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="start"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.tipo}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.valor}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.vencimento}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.datapagamento}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="container-linha-gerador">
          <div className="campos-result-parce">
            <label>Quantidade</label>
            <p>
              <AccountTreeIcon fontSize={"small"} /> {selectedRows.length}
            </p>
          </div>
          <div className="campos-result-parce">
            <label>Valor Total</label>
            <p>
              <CurrencyExchangeIcon fontSize={"small"} />
              {calculateTotalValue().toFixed(2)}
            </p>
          </div>
          <div className="campos-result-parce">
            <label>Desconto</label>
            <div className="desconto-gerador">
              <CreditScoreIcon />
              <input
                type="number"
                value={discountPercentage}
                onChange={handleDiscountChange}
              ></input>
            </div>
          </div>
          <div className="campos-result-parce">
            <label>Total a Pagar</label>
            <div className="desconto-gerador">
              <CurrencyExchangeIcon fontSize={"small"} />
              <input
                value={(
                  calculateTotalValue() - calculateDiscount(discountPercentage)
                ).toFixed(2)}
                readOnly
              />
            </div>
          </div>
          <div className="campos-button-parcelas1">
            <ButtonIconTextoStart
              title={"GERAR PARCELAS"}
              corFundoBotao={"#006B33"}
              fontSizeBotao={"10px"}
              fontWeightBotao={700}
              corTextoBotao={"#ffff"}
              funcao={() => abrirModalCadastro()}
            />
          </div>
        </div>
        <ModalEdicao
          titulo="Informações do Cliente"
          isOpen={modalCadastroOpen}
          onClose={fecharModalCadastro}
        >
          <div className="linha-parcelas2">
            <div className="campos-parcelas2-gerador">
              <label>Cobrador</label>
              <input></input>
            </div>
            <div className="campos-parcelas2-gerador">
              <label>Região</label>
              <input type="date"></input>
            </div>
            <div className="campos-parcelas2-gerador">
              <label>Rota</label>
              <select></select>
            </div>
          </div>
          <div className="linha-parcelas2">
            <div className="campos-parcelas4">
              <label>Motivo da Negociação</label>
              <textarea></textarea>
            </div>
          </div>
          <div className="linha-parcelas3">
            <div className="campos-parcelas1">
              <ButtonIconTextoStart
                title={"SALVAR"}
                corFundoBotao={"#006B33"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corTextoBotao={"#ffff"}
              />
            </div>
          </div>
        </ModalEdicao>
      </div>
    </div>
  );
};

export default Gerador;
