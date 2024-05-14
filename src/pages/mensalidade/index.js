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
import ModalGerarParcelas from "../../components/modal-gerar-parcelas";

function createData(
  id,
  name,
  datavencimento,
  datapagamento,
  valor,
  formapagamento
) {
  return { id, name, datavencimento, datapagamento, valor, formapagamento };
}

const rows = [
  createData("01", "Carlos Ribeiro", "20/05/2024", "", "", "Pix"),
  createData("02", "Carlos Ribeiro", "21/05/2024", "", "100,00", "Pix"),
  createData("03", "Carlos Ribeiro", "23/05/2024", "", "100,00", "Pix"),
  createData("04", "Carlos Ribeiro", "20/05/2024", "21/05/2024", "100", "Pix"),
  createData("05", "Carlos Ribeiro", "21/05/2024", "22/05/2024", "100", "Pix"),
  createData(
    "06",
    "Carlos Ribeiro",
    "23/05/2024",
    "24/05/2024",
    "100,00",
    "Pix"
  ),
];

const Mensalidade = () => {
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const [modalGerarParcelasOpen, setModalGerarParcelas] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isEstornoButtonEnabled, setIsEstornoButtonEnabled] = useState(false);

  const abrirModalGerarParcelas = () => {
    setModalGerarParcelas(true);
  };

  const fecharModalGerarParcelas = () => {
    setModalGerarParcelas(false);
  };

  const abrirModalCadastro = () => {
    setModalCadastro(true);
  };

  const fecharModalCadastro = () => {
    setModalCadastro(false);
  };

  const handleRowClick = (id, event) => {
    const targetTag = event.target.tagName.toLowerCase();
    if (targetTag !== "input") {
      const selectedIndex = selectedRows.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, id);
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
    }
  };

  const handleInputChange = (id, field, value) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const isEstornoEnabled = () => {
    // Verifica se pelo menos uma linha está selecionada
    if (selectedRows.length === 0) return false;
  
    // Verifica se todas as linhas selecionadas têm os campos preenchidos
    const allSelectedRowsWithData = selectedRows.every((rowId) => {
      const inputValue = inputValues[rowId];
      const row = rows.find((row) => row.id === rowId);
  
      // Verifica se todos os campos obrigatórios estão preenchidos
      return (
        (inputValue && inputValue.datapagamento && inputValue.valor && inputValue.formapagamento) || // Verifica se os inputs têm valor
        (row && row.datapagamento && row.valor && row.formapagamento) // Verifica se a linha original (rows) tem valor
      );
    });
  
    return allSelectedRowsWithData;
  };
  
  useEffect(() => {
    setIsEstornoButtonEnabled(isEstornoEnabled());
  }, [selectedRows, inputValues]);
  

  useEffect(() => {
    const initialValues = {};
    rows.forEach((row) => {
      initialValues[row.id] = {
        datapagamento: row.datapagamento || "",
        valor: row.valor || "",
        formapagamento: row.formapagamento || "",
      };
    });
    setInputValues(initialValues);
  }, []);

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
                funcao={abrirModalGerarParcelas}
              />
            </div>
            <div className="disabled-button">
              <button
                className={isEstornoButtonEnabled ? "" : "disabled-button"}
                disabled={!isEstornoButtonEnabled}
                style={{
                  backgroundColor: isEstornoButtonEnabled ? "#006b33" : "#ccc",
                }} // verde se habilitado, cinza se desabilitado
              >
                ESTORNAR PARCELA
              </button>
            </div>
          </div>
        </div>

        <ModalGerarParcelas
          isOpen={modalGerarParcelasOpen}
          onClose={fecharModalGerarParcelas}
        ></ModalGerarParcelas>

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
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell align="center">Data Vencimento</TableCell>
                <TableCell
                  align="center"
                  className="valores-tabela-parcela"
                  sx={{ width: "15%" }}
                >
                  Data Pagamento
                </TableCell>
                <TableCell
                  align="center"
                  className="valores-tabela-parcela"
                  sx={{ width: "15%" }}
                >
                  Valor
                </TableCell>
                <TableCell
                  align="center"
                  className="valores-tabela-parcela"
                  sx={{ width: "15%" }}
                >
                  Forma Pagamento
                </TableCell>
                <TableCell align="center">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    backgroundColor:
                      selectedRows.indexOf(row.id) !== -1
                        ? "#e0e0e0"
                        : "inherit",
                  }}
                  onClick={(event) => handleRowClick(row.id, event)}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.datavencimento}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="valores-tabela-parcela"
                    sx={{ width: "15%" }}
                  >
                    <input
                      value={
                        inputValues[row.id]?.datapagamento ||
                        row.datapagamento ||
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "datapagamento",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="valores-tabela-parcela"
                    sx={{ width: "15%" }}
                  >
                    <input
                      value={inputValues[row.id]?.valor || row.valor || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "valor", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="valores-tabela-parcela"
                    sx={{ width: "15%" }}
                  >
                    <input
                      value={
                        inputValues[row.id]?.formapagamento ||
                        row.formapagamento ||
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "formapagamento",
                          e.target.value
                        )
                      }
                    />
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
