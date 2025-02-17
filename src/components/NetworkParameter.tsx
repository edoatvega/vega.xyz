import React from "react";
import { useNetworkParams } from "../hooks/use-network-params";
import { SnakeToCamel } from "../utils/tools";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import ParameterBox from "./ParameterBox";

export interface NetworkParameterProps {
  param: string;
  prefix?: string;
  suffix?: string;
  formatForVega?: boolean;
  expressPercentage?: boolean;
}

const explorerUrl = "https://explorer.vega.xyz/network-parameters";

const NetworkParameter = ({
  param,
  prefix,
  suffix,
  formatForVega = false,
  expressPercentage = false,
}: NetworkParameterProps) => {
  const { params, loading, error } = useNetworkParams();
  const { t } = useTranslation("component.network-parameter");

  const formatVegaValue = (value) => {
    return (value / 1000000000000000000).toFixed(2);
  };

  const formatValue = (value) => {
    if (formatForVega) {
      return formatVegaValue(value);
    } else if (expressPercentage) {
      return value * 100;
    } else {
      return value;
    }
  };

  return (
    <>
      {loading && (
        <span>
          <ParameterBox value={t("Loading...")} />
        </span>
      )}
      {error && (
        <span>
          <ParameterBox value={t("Error loading value")} />
        </span>
      )}
      {params && (
        <a href={`${explorerUrl}#${SnakeToCamel(param)}`} target="_blank">
          <ParameterBox
            value={formatValue(params[param])}
            prefix={prefix}
            suffix={suffix}
            description={`This value is determined by the network parameter ‘${SnakeToCamel(
              param
            )}’`}
          />
        </a>
      )}
    </>
  );
};

export default NetworkParameter;
