# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
#                https://docs.brew.sh/Node-for-Formula-Authors

require "language/node"

class LogAnalyzer < Formula
   desc " ⏲ Log analyzer CLI for Heroku, AWS, etc."
   homepage "https://github.com/alikadir/log-analyzer-cli#readme"
   url "https://registry.npmjs.org/log-analyzer-cli/-/log-analyzer-cli-1.0.2.tgz"
   sha256 "36992cb13ab7a43382a9eaa69f5affaf42800cb415bd179668d2537f9e484308"

   depends_on "node"
   def install
     system "npm", "install", *Language::Node.std_npm_install_args(libexec)
     bin.install_symlink Dir["#{libexec}/bin/*"]
   end
end
