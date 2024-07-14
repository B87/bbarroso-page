package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/b87/bbarroso.page/internal/server"
)

var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start the server",
	Run: func(cmd *cobra.Command, args []string) {
		server := server.NewServer()

		err := server.ListenAndServe()
		if err != nil {
			panic(fmt.Sprintf("cannot start server: %s", err))
		}
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
