"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Busca() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<any>(null);

  const handleBuscar = async () => {
    if (!cep) return;
    setLoading(true);
    setDados(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 6 },
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Grid container spacing={3}>
          {/* Cabeçalho */}
          <Grid size={{ xs: 12}}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              textAlign="center"
              color="primary"
            >
              Busca de CEP
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mt={1}
            >
              Digite o CEP abaixo para buscar informações do endereço.
            </Typography>
          </Grid>

          {/* Campo de busca */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              label="Digite o CEP"
              variant="outlined"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              inputProps={{ maxLength: 8 }}
            />
          </Grid>

          {/* Botão */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleBuscar}
              sx={{ height: "100%" }}
            >
              Buscar
            </Button>
          </Grid>

          {/* Resultado */}
          <Grid size={{ xs: 12 }}>
            {loading ? (
              <Box textAlign="center" mt={2}>
                <CircularProgress color="primary" />
              </Box>
            ) : dados ? (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#e3f2fd",
                }}
              >
                {dados.erro ? (
                  <Typography color="error" textAlign="center">
                    CEP não encontrado.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Resultado:
                    </Typography>
                    <Typography><strong>Logradouro:</strong> {dados.logradouro}</Typography>
                    <Typography><strong>Bairro:</strong> {dados.bairro}</Typography>
                    <Typography><strong>Cidade:</strong> {dados.localidade}</Typography>
                    <Typography><strong>Estado:</strong> {dados.uf}</Typography>
                  </>
                )}
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
