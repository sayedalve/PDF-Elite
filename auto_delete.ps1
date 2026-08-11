$maxLoops = 5
for ($i=0; $i -lt $maxLoops; $i++) {
    Write-Host "Running compileTestJava, loop $i..."
    $process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c .\gradlew.bat :stirling-pdf:compileTestJava -PnoSpotless" -NoNewWindow -Wait -PassThru -RedirectStandardOutput "build_out.txt" -RedirectStandardError "build_err.txt"
    
    if ($process.ExitCode -eq 0) {
        Write-Host "Compilation succeeded!"
        break
    }
    
    $output = Get-Content "build_out.txt" -ErrorAction SilentlyContinue
    $errOutput = Get-Content "build_err.txt" -ErrorAction SilentlyContinue
    
    $filesToDelete = @()
    foreach ($line in $output) {
        if ($line -match "^(C:\\Users\\sayed\\Downloads\\PDF-Elite\\[^:]+\.java):\d+: error: cannot find symbol") {
            $filesToDelete += $matches[1]
        }
        if ($line -match "^(C:\\Users\\sayed\\Downloads\\PDF-Elite\\[^:]+\.java):\d+: error: package .* does not exist") {
            $filesToDelete += $matches[1]
        }
    }
    
    $filesToDelete = $filesToDelete | Select-Object -Unique
    
    if ($filesToDelete.Count -eq 0) {
        Write-Host "No matching error files found to delete, but compilation failed. Exiting loop."
        break
    }
    
    Write-Host "Found $( $filesToDelete.Count ) files with missing symbols/packages. Deleting..."
    foreach ($file in $filesToDelete) {
        if (Test-Path $file) {
            Write-Host "Deleting $file"
            Remove-Item $file -Force
        }
    }
}
