"use client";

import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Busca() {
  const [cep, setCep] = useState("");

  const handleBuscar = () => {
    if (!cep.trim()) {
      alert("Por favor, digite um CEP válido.");
      return;
    }
    // Aqui futuramente você pode adicionar a função que consulta a API de CEP
    console.log("Buscando CEP:", cep);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Buscar CEP
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Digite o CEP abaixo para consultar o endereço correspondente.
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Digite o CEP"
              variant="outlined"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              inputProps={{ maxLength: 9 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleBuscar}
              sx={{
                height: "100%",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
