import { ILinkEventTracker } from "@nitrots/nitro-renderer";
import { FC, useEffect, useState, useMemo } from "react";
import {
  AddEventLinkTracker,
  RemoveLinkEventTracker,
  GetConfiguration,
} from "../../api";
import {
  NitroCardContentView,
  NitroCardHeaderView,
  NitroCardView,
  Flex,
  Grid,
  Column,
  LayoutCurrencyIcon,
  Text,
} from "../../common";
import { usePurse } from "../../hooks";
import "./BolsaView.scss";

export const BolsaView: FC<{}> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { purse = null } = usePurse();
  const displayedCurrencies = useMemo(
    () => GetConfiguration<number[]>("system.currency.types", []),
    []
  );
  const currencyDisplayNumberShort = useMemo(
    () => GetConfiguration<boolean>("currency.display.number.short", false),
    []
  );

  useEffect(() => {
    const linkTracker: ILinkEventTracker = {
      linkReceived: (url: string) => {
        const parts = url.split("/");

        if (parts.length < 2) return;

        switch (parts[1]) {
          case "show":
            setIsVisible(true);
            return;
          case "hide":
            setIsVisible(false);
            return;
          case "toggle":
            setIsVisible((prevValue) => !prevValue);
            return;
        }
      },
      eventUrlPrefix: "bolsa/",
    };

    AddEventLinkTracker(linkTracker);

    return () => RemoveLinkEventTracker(linkTracker);
  }, []);

  // Handlers para drag and drop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const getCurrencyElements = () => {
    if (!purse || !purse.activityPoints || !purse.activityPoints.size)
      return null;

    const types = Array.from(purse.activityPoints.keys()).filter(
      (type) => displayedCurrencies.indexOf(type) >= 0
    );

    const elements: JSX.Element[] = [];

    for (const type of types) {
      const amount = purse.activityPoints.get(type);
      elements.push(
        <div key={type} className="d-flex align-items-center gap-2">
          <LayoutCurrencyIcon type={type} />
          <Text variant="dark" className="fw-bold small">
            {currencyDisplayNumberShort && amount > 999
              ? `${Math.floor(amount / 1000)}k`
              : amount.toLocaleString()}{" "}
            {type === 0 ? "Pixels" : type === 5 ? "Diamantes" : `Moeda ${type}`}
          </Text>
        </div>
      );
    }

    return elements;
  };

  if (!isVisible) return null;

  return (
    <NitroCardView
      uniqueKey="bolsa"
      className="nitro-bolsa"
      theme="primary-slim"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
      }}
    >
      {/* Área de drag - invisível mas clicável no topo */}
      <div
        className="drag-area"
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: 5,
        }}
      />

      <button
        className="close-button"
        onClick={() => setIsVisible(false)}
        aria-label="Fechar"
      >
        ×
      </button>
      <NitroCardContentView>
        <div className="d-flex flex-column gap-3">
          {purse ? (
            <div className="d-flex flex-column gap-2">
              {/* Créditos principais */}
              <div className="text-center py-2" style={{ marginTop: "90px" }}>
                <Text className="fw-bold small">
                  Você tem{" "}
                  <span className="fs-4 fw-bold">
                    {currencyDisplayNumberShort && purse.credits > 999
                      ? `${Math.floor(purse.credits / 1000)}k`
                      : purse.credits.toLocaleString()}
                  </span>{" "}
                  Habbo Moedas
                </Text>
              </div>

              {/* Outras moedas - na mesma linha */}
              <div
                className="d-flex justify-content-center gap-4"
                style={{ marginTop: "156px" }}
              >
                {getCurrencyElements()}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted">
              <i className="fas fa-spinner fa-spin"></i>
              <div>Carregando saldo...</div>
            </div>
          )}

          <div
            className="d-flex justify-content-center gap-3"
            style={{ marginTop: "-8px", padding: "0 20px" }}
          >
            <button className="custom-button">💰 Comprar Créditos</button>
            <button className="custom-button">📊 Histórico</button>
          </div>
        </div>
      </NitroCardContentView>
    </NitroCardView>
  );
};
