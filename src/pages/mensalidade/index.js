import React, { useState } from "react";
import "./mensalidade.css";
import HeaderParcelas from "../../components/header-parcelas";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArticleIcon from "@mui/icons-material/Article";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModalEdicao from "../../../../pax-cadastro/src/components/modal-edicao";

function createData(
  name,
  contrato,
  datavencimento,
  diapagamento,
  valor,
  formapagamento
) {
  return {
    name,
    contrato,
    datavencimento,
    diapagamento,
    valor,
    formapagamento,
  };
}

const initialRows = [
  createData(
    "Carlos Ribeiro",
    123456,
    "20/05/2024",
    "20/05/2024",
    "100,00",
    "Pix"
  ),
  createData(
    "Lucas Souza",
    654987,
    "21/05/2024",
    "21/05/2024",
    "100,00",
    "Pix"
  ),
  createData(
    "Luiza Alencar",
    321987,
    "23/05/2024",
    "23/05/2024",
    "100,00",
    "Pix"
  ),
];

const Mensalidade = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalCadastroOpen, setModalCadastro] = useState(false);

  const handleInputChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

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
            <div className="campos-parcelas">
              <label>Contrato</label>
              <input></input>
            </div>
            <div className="campos-parcelas1">
              <ButtonIconTextoStart
                title={"PESQUISAR"}
                corFundoBotao={"#006B33"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corTextoBotao={"#ffff"}
              />
            </div>
            <div className="campos-parcelas1">
              <ButtonIconTextoStart
                title={"GERAR PARCELA"}
                corFundoBotao={"#006B33"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corTextoBotao={"#ffff"}
              />
            </div>
            <div className="campos-parcelas1">
              <ButtonIconTextoStart
                title={"ESTORNAR PARCELA"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corFundoBotao={"#006B33"}
                corTextoBotao={"#ffff"}
              />
            </div>
          </div>
        </div>
        <ModalEdicao
          titulo="Informações do Cliente"
          isOpen={modalCadastroOpen}
          onClose={fecharModalCadastro}
        >
          <div className="linha-parcelas2">
            <div className="campos-parcelas2">
              <label>Valor</label>
              <input></input>
            </div>
            <div className="campos-parcelas3">
              <label>Data Vencimento</label>
              <input type="date"></input>
            </div>
            <div className="campos-parcelas2">
              <label>Tipo Parcela</label>
              <select></select>
            </div>
            <div className="campos-parcelas2">
              <label>Caixa</label>
              <input></input>
            </div>
            <div className="campos-parcelas3">
              <label>Forma Pagamento</label>
              <select></select>
            </div>
            <div className="campos-parcelas2">
              <label>Data Pagamento</label>
              <input type="date"></input>
            </div>
          </div>
          <div className="linha-parcelas2">
            <div className="campos-parcelas4">
              <label>Motivo</label>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="center">Contrato</TableCell>
                <TableCell align="center">Data Vencimento</TableCell>
                <TableCell align="center">Dia Pagamento</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Forma Pagamento</TableCell>
                <TableCell align="start">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
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
                    component="th"
                    scope="row"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.contrato}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    {row.datavencimento}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    <div className="valores-tabela-parcela">
                      <input
                        type="text"
                        value={row.diapagamento}
                        onChange={(e) =>
                          handleInputChange(e, index, "diapagamento")
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    <div className="valores-tabela-parcela">
                      <input
                        type="text"
                        value={row.valor}
                        onChange={(e) => handleInputChange(e, index, "valor")}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: isSelected(row.name) ? "#fff" : "inherit",
                    }}
                  >
                    <div className="valores-tabela-parcela">
                      <input
                        type="text"
                        value={row.formapagamento}
                        onChange={(e) =>
                          handleInputChange(e, index, "formapagamento")
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="options-table-parcelas">
                      <ButtonIconTextoStart
                        corFundoBotao={"#006B33"}
                        corTextoBotao={"#ffff"}
                        icon={<ArticleIcon fontSize={"small"} />}
                        funcao={(e) => {
                          e.stopPropagation(); // Evita a propagação do evento
                          abrirModalCadastro();
                        }}
                      />

                      <div className="buttons-parcelas">
                        <ButtonIconTextoStart
                          corFundoBotao={"#FF0000"}
                          corTextoBotao={"#ffff"}
                          icon={<HighlightOffIcon fontSize={"small"} />}
                          onClick={(e) => e.stopPropagation()} // Evita a propagação do evento
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Mensalidade;
