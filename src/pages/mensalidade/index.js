import React, { useState, useEffect } from "react";
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
  datapagamento,
  valor,
  formapagamento
) {
  // Função para formatar a data no formato dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Retorna uma string vazia se a data for falsy
    const [day, month, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
  };

  return {
    name,
    contrato,
    datavencimento: formatDate(datavencimento),
    datapagamento: formatDate(datapagamento),
    valor,
    formapagamento,
  };
}

const initialRows = [
  createData("Carlos Ribeiro", 123456, "20/05/2024", "", "100,00", "Pix"),
  createData("Lucas Souza", 654987, "21/05/2024", "", "100,00", "Pix"),
  createData("Luiza Alencar", 321987, "23/05/2024", "", "100,00", "Pix"),
  createData(
    "Felipe Perez",
    123456,
    "20/05/2024",
    "20/05/2024",
    "100,00",
    "Pix"
  ),
  createData(
    "Larissa Costa",
    654987,
    "21/05/2024",
    "22/05/2024",
    "100,00",
    "Pix"
  ),
  createData(
    "José Alencar",
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
  const [gerarParcelaDisabled, setGerarParcelaDisabled] = useState(true);

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

  const gerarParcela = () => {
    // Lógica para gerar parcela
  };

  useEffect(() => {
    // Verificar se há pelo menos uma linha selecionada e se a data está informada em alguma linha
    const hasSelectedRow = selectedRows.length > 0;
    const hasDate = rows.some((row) => row.datavencimento.trim() !== "");
    setGerarParcelaDisabled(!hasSelectedRow || !hasDate);
  }, [rows, selectedRows]); // Adicionamos selectedRows como uma dependência do useEffect

  const handleInputChange2 = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);

    // Habilitar o botão "GERAR PARCELA" se uma linha estiver selecionada e uma data for informada
    if (selectedRows.length > 0 && e.target.value.trim() !== "") {
      setGerarParcelaDisabled(false);
    } else {
      setGerarParcelaDisabled(true);
    }
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
                onClick={gerarParcela}
                disabled={gerarParcelaDisabled}
              />
            </div>
            <div className="campos-parcelas1">
              <ButtonIconTextoStart
                title={"GERAR PARCELA"}
                corFundoBotao={gerarParcelaDisabled ? "#cccccc" : "#006B33"}
                fontSizeBotao={"10px"}
                fontWeightBotao={700}
                corTextoBotao={"#ffff"}
                funcao={gerarParcela}
                disabled={gerarParcelaDisabled}
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
                <TableCell align="center" sx={{ width: "15%" }}>
                  Data Pagamento
                </TableCell>
                <TableCell align="center" sx={{ width: "13%" }}>
                  Valor
                </TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>
                  Forma Pagamento
                </TableCell>
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
                    <div
                      className="valores-tabela-parcela"
                      style={{ width: "100%" }}
                    >
                      <input
                        value={row.datapagamento}
                        onChange={(e) =>
                          handleInputChange2(e, index, "datapagamento")
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
                    <div
                      className="valores-tabela-parcela"
                      sx={{ width: "13%" }}
                    >
                      <input
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
                    <div
                      className="valores-tabela-parcela"
                      sx={{ width: "15%" }}
                    >
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
