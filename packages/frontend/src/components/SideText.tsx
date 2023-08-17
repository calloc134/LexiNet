import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  primaryText: string;
  secondaryText: string;
};

export const SideText: FC<Props> = ({ primaryText, secondaryText }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="h6">{primaryText}</Typography>
      <Typography variant="caption" sx={{ pb: 0.3, opacity: 0.5 }}>
        {secondaryText}
      </Typography>
    </Stack>
  );
};
