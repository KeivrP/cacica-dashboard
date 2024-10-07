import type { TableRowProps } from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  searchQuery: string;
  language?: 'en' | 'es';
};

export function TableNoData({ searchQuery, language = "es", ...other }: TableNoDataProps) {
  const content = {
    en: {
      notFound: 'Not found',
      noResults: 'No results found for',
      //suggestion: 'Try checking for typos or using complete words.',
    },
    es: {
      notFound: 'No encontrado',
      noResults: 'No se encontraron resultados para',
      //suggestion: 'Intenta verificar errores tipográficos o usar palabras completas.',
    },
  };

  const { notFound, noResults } = content[language];

  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {notFound}
          </Typography>

          <Typography variant="body2">
            {noResults} &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>.
            <br />
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
