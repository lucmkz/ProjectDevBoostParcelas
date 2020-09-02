import React from "react";

import { changeCommaToPoint } from "../Utils";

import "./style.css";

class Gerador extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
      rate: "",
      installments: 1,
      installmentsValue: 0,
      optionsList: [1],
    };
  }

  getValueInstallment() {
    return (
      this.state.value / this.state.installments +
      (changeCommaToPoint(this.state.rate) / 100) * this.state.value
    ).toFixed(2);
  }

  handleComponentState = async (e, component) => {
    await this.setState({ [component]: e.target.value });

    if (component === "installments") {
      const arr = [1];
      for (let i = 2; i <= +this.state.installments; i++) {
        arr.push(i);
      }
      this.setState({
        optionsList: arr,
        installmentsValue: this.getValueInstallment(),
      });
    }
  };

  render() {
    return (
      <div className="main">
        <section className="form">
          <label htmlFor="inputNome">Nome do Produto</label>
          <input
            id="inputNome"
            onChange={(e) => {
              e.target.value.length < 18 &&
                this.handleComponentState(e, "name");
            }}
            value={this.state.name}
          />

          <label htmlFor="inputValue">Valor do Produto do produto</label>
          <input
            id="inputValue"
            onChange={(e) => this.handleComponentState(e, "value")}
            value={this.state.value}
          />

          <label htmlFor="inputRate">Taxa (% a.m)</label>
          <input
            type="text"
            id="inputRate"
            onChange={(e) => this.handleComponentState(e, "rate")}
            value={`${this.state.rate}`}
          />

          <label htmlFor="inputInstallments">
            Quantidade de parcelas (12 máximo)
          </label>
          <input
            type="number"
            id="inputInstallments"
            onChange={(e) => {
              e.target.value <= 12 &&
                e.target.value > 0 &&
                this.handleComponentState(e, "installments");
            }}
            value={this.state.installments}
          />
        </section>

        <section className="rightPanels">
          <div className="simulacao">
            <label className="title">Simulação {`${this.state.name}`}</label>
            <span>
              Total de: R${" "}
              {(this.getValueInstallment() * this.state.installments).toFixed(2)}
            </span>
          </div>

          <div>
          {
          this.state.rate &&
              this.state.value &&
              this.state.name &&
              this.state.optionsList.map((opt) => (
                <div className="iten" key={opt}>
                    <span>Parcela nº {`${opt}`}</span>
                    <span>Valor R$ {this.getValueInstallment()}</span>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default Gerador;
